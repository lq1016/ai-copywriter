import type { Metadata } from "next";
import { Noto_Sans_SC } from "next/font/google";
import "./globals.css";

const notoSansSC = Noto_Sans_SC({
  variable: "--font-noto-sans-sc",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "AI电商文案生成器 - 10秒生成高转化商品标题",
  description: "AI帮你写淘宝/小红书文案，点击率提升200%。支持商品标题生成、卖点提取、详情页文案、小红书笔记。",
  keywords: "AI文案,电商标题,淘宝标题,小红书文案,详情页文案",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className={`${notoSansSC.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
