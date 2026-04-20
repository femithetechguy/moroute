import type { Metadata } from "next";
import { DM_Sans, Syne } from "next/font/google";
import contentData from "@/content/moroute-content.json";
import type { MorouteContent } from "@/types/content";
import "./globals.css";

const content = contentData as MorouteContent;

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["300", "400", "500"]
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "700", "800"]
});

export const metadata: Metadata = {
  title: content.meta.title,
  description: content.meta.description
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${dmSans.variable} ${syne.variable}`}>{children}</body>
    </html>
  );
}
