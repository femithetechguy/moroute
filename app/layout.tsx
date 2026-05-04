import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Sora } from "next/font/google";
import contentData from "@/content/moroute-content.json";
import type { MorouteContent } from "@/types/content";
import { getMetadataBase, getSiteUrl } from "@/lib/seo";
import "./globals.css";

const content = contentData as MorouteContent;
const metadataBase = getMetadataBase();
const siteUrl = getSiteUrl();

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
  metadataBase,
  applicationName: content.brand,
  title: content.meta.title,
  description: content.meta.description,
  alternates: {
    canonical: "/"
  },
  openGraph: {
    type: "website",
    siteName: content.brand,
    title: content.meta.title,
    description: content.meta.description,
    url: "/",
    images: [
      {
        url: `${siteUrl}/images/brand/preview_portrait.png`,
        width: 1080,
        height: 1080,
        alt: `${content.brand} - Smarter routes. Safer trips. Better outcomes.`,
        type: "image/png"
      },
      {
        url: `${siteUrl}/images/brand/preview_landscape.png`,
        width: 1200,
        height: 630,
        alt: `${content.brand} app preview`,
        type: "image/png"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: content.meta.title,
    description: content.meta.description,
    images: [`${siteUrl}/images/brand/preview_landscape.png`]
  }
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
