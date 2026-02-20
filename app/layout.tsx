import type { Metadata } from "next";
import "@/src/index.css";

export const metadata: Metadata = {
  title: "小黑的奇幻岛屿 | The Magical Island of Xiaohei",
  description: "小黑的个人品牌网站 - 在岩壁上寻找自由，在代码中构建万物。连接有趣的人，一起 Vibe Coding，一起坠入山海。",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh" className="scroll-smooth">
      <body>{children}</body>
    </html>
  );
}
