# ScamShield Alliance (Next.js + LINE OA)

LINE OA backend สำหรับตรวจสอบข้อความและรูปภาพที่น่าสงสัยด้วย GPT-4.1-mini พร้อมหน้าเว็บแนะนำบริการ.

## Quick Start

1. ติดตั้ง dependencies

```bash
npm install
```

2. ตั้งค่าไฟล์ `.env`

```
OPENAI_API_KEY=your_openai_api_key
LINE_CHANNEL_SECRET=your_line_channel_secret
LINE_CHANNEL_ACCESS_TOKEN=your_line_channel_access_token
```

3. รันเซิร์ฟเวอร์

```bash
npm run dev
```

## LINE Webhook

ตั้งค่า Webhook URL ไปที่:

```
https://<your-domain>/api/line/webhook
```

ระบบจะตรวจลายเซ็นของ LINE, วิเคราะห์ข้อความ/รูปภาพด้วย GPT-4.1-mini และตอบกลับเฉพาะกรณีที่เกี่ยวข้องกับ scammers.

## โครงสร้างหลัก

- หน้าเว็บ: `src/app/page.tsx`
- Webhook: `src/app/api/line/webhook/route.ts`
- CSS: `src/app/page.module.css`, `src/app/globals.css`
# ssm
