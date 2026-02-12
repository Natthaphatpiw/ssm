import crypto from "crypto";
import OpenAI from "openai";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

type LineMessage =
  | {
      id: string;
      type: "text";
      text: string;
    }
  | {
      id: string;
      type: "image";
    }
  | {
      id: string;
      type: string;
    };

type LineEvent = {
  type: string;
  replyToken?: string;
  message?: LineMessage;
};

type LineWebhookBody = {
  events?: LineEvent[];
};

type ScamAnalysis = {
  category: "image" | "text" | "other";
  image_type: "screenshot" | "phone_number" | "ongoing_scam" | "other" | null;
  scam_type: string | null;
  scam_score: number | null;
  reply: string | null;
  notes: string | null;
};

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const LINE_REPLY_ENDPOINT = "https://api.line.me/v2/bot/message/reply";
const LINE_CONTENT_ENDPOINT = "https://api-data.line.me/v2/bot/message";

const SYSTEM_PROMPT = `
You are ScamShield Alliance, a Thai-language scam safety analyst for LINE OA.
Return JSON only. The output must be a single JSON object.

Required JSON schema:
{
  "category": "image" | "text" | "other",
  "image_type": "screenshot" | "phone_number" | "ongoing_scam" | "other" | null,
  "scam_type": string | null,
  "scam_score": number | null,
  "reply": string | null,
  "notes": string | null
}

Classification rules:
- "image": user sent an image to check for scam.
- "text": user sent a scam-related text message (SMS/DM/romance/investment/etc.).
- "other": unrelated chat, small talk, filler follow-ups ("ช่วยดูให้หน่อย"), or duplicates with no new info.

Reply rules:
- If category is "other", set reply to null.
- Otherwise, write the reply in Thai, concise, and supportive. Do not ask for personal data.
- Include scam_score as 0-100 if category is image or text.
- Use this style (line breaks + hyphen bullets only):
  "🚨 มิจฉาชีพ XX% ครับ! <หัวข้อสั้น>"
  "- จุดสังเกต: ..."
  "- วิธีจัดการ: ..."
  "ส่งข้อความ/รูปอื่นมาได้เลย ผมช่วยดูต่อให้ครับ"
- If low confidence, use "⚠️ ยังไม่ชัดเจน" or "✅ น่าจะปลอดภัย" and explain why.

Remember: output must be JSON only.
`.trim();

function getEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }
  return value;
}

function verifySignature(body: string, signature: string | null): boolean {
  if (!signature) {
    return false;
  }
  const secret = getEnv("LINE_CHANNEL_SECRET");
  const hash = crypto
    .createHmac("sha256", secret)
    .update(body)
    .digest("base64");
  const hashBuffer = Buffer.from(hash);
  const signatureBuffer = Buffer.from(signature);
  if (hashBuffer.length !== signatureBuffer.length) {
    return false;
  }
  return crypto.timingSafeEqual(hashBuffer, signatureBuffer);
}

async function fetchLineImage(messageId: string): Promise<string> {
  const token = getEnv("LINE_CHANNEL_ACCESS_TOKEN");
  const response = await fetch(`${LINE_CONTENT_ENDPOINT}/${messageId}/content`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`LINE content fetch failed: ${response.status}`);
  }

  const contentType = response.headers.get("content-type") ?? "image/jpeg";
  const buffer = Buffer.from(await response.arrayBuffer());
  const base64 = buffer.toString("base64");
  return `data:${contentType};base64,${base64}`;
}

function safeParseJSON(payload: string): ScamAnalysis | null {
  try {
    const parsed = JSON.parse(payload) as ScamAnalysis;
    if (!parsed || typeof parsed !== "object") {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

async function analyzeWithOpenAI(input: {
  text?: string;
  imageDataUrl?: string;
}): Promise<ScamAnalysis | null> {
  const parts: Array<{ type: "input_text"; text: string } | { type: "input_image"; image_url: string }> = [];

  if (input.text) {
    parts.push({
      type: "input_text",
      text: `ข้อความจากผู้ใช้: ${input.text}`,
    });
  }
  if (input.imageDataUrl) {
    parts.push({
      type: "input_image",
      image_url: input.imageDataUrl,
    });
  }

  const response = await openai.responses.create({
    model: "gpt-4.1-mini",
    input: [
      { role: "system", content: SYSTEM_PROMPT },
      {
        role: "user",
        content: parts,
      },
    ],
    text: { format: { type: "json_object" } },
    temperature: 0.2,
  });

  const outputText =
    response.output_text ??
    response.output
      ?.flatMap((item) =>
        item.type === "message"
          ? item.content
              .filter((content) => content.type === "output_text")
              .map((content) => content.text)
          : []
      )
      .join("") ??
    "";

  if (!outputText) {
    return null;
  }

  return safeParseJSON(outputText);
}

async function replyLine(replyToken: string, message: string): Promise<void> {
  const token = getEnv("LINE_CHANNEL_ACCESS_TOKEN");
  const response = await fetch(LINE_REPLY_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      replyToken,
      messages: [{ type: "text", text: message }],
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`LINE reply failed: ${response.status} ${text}`);
  }
}

function isValidReplyToken(token?: string): token is string {
  return Boolean(token && token !== "00000000000000000000000000000000");
}

export async function POST(request: NextRequest) {
  const bodyText = await request.text();
  const signature = request.headers.get("x-line-signature");

  try {
    if (!verifySignature(bodyText, signature)) {
      return NextResponse.json({ ok: false }, { status: 401 });
    }
  } catch (error) {
    console.error("Signature verification error:", error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }

  let payload: LineWebhookBody;
  try {
    payload = JSON.parse(bodyText) as LineWebhookBody;
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const events = payload.events ?? [];
  if (!events.length) {
    return NextResponse.json({ ok: true });
  }

  await Promise.all(
    events.map(async (event) => {
      try {
        if (
          event.type !== "message" ||
          !event.message ||
          !isValidReplyToken(event.replyToken)
        ) {
          return;
        }

        let analysis: ScamAnalysis | null = null;

        if (event.message.type === "text") {
          analysis = await analyzeWithOpenAI({ text: event.message.text });
        } else if (event.message.type === "image") {
          const imageDataUrl = await fetchLineImage(event.message.id);
          analysis = await analyzeWithOpenAI({ imageDataUrl });
        } else {
          return;
        }

        if (!analysis || analysis.category === "other" || !analysis.reply) {
          return;
        }

        await replyLine(event.replyToken as string, analysis.reply.trim());
      } catch (error) {
        console.error("Event handling error:", error);
      }
    })
  );

  return NextResponse.json({ ok: true });
}
