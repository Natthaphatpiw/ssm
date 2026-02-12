import type { Metadata } from "next";
import { IBM_Plex_Sans_Thai, Kanit } from "next/font/google";
import "./globals.css";

const bodyFont = IBM_Plex_Sans_Thai({
  weight: ["400", "500", "600"],
  subsets: ["thai", "latin"],
  variable: "--font-body",
});

const headingFont = Kanit({
  weight: ["600", "700"],
  subsets: ["thai", "latin"],
  variable: "--font-heading",
});

export const metadata: Metadata = {
  title: "ScamShield Alliance",
  description: "LINE OA ตรวจสอบข้อความและรูปภาพที่น่าสงสัยด้วย AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th">
      <body className={`${bodyFont.variable} ${headingFont.variable}`}>
        {children}
      </body>
    </html>
  );
}
