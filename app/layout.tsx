import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Sora } from "next/font/google";
import contentData from "@/content/moroute-content.json";
import type { MorouteContent } from "@/types/content";
import "./globals.css";

const content = contentData as MorouteContent;

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"]
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["600", "700", "800"]
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
      <body className={`${plusJakartaSans.variable} ${sora.variable}`}>{children}</body>
    </html>
  );
}
