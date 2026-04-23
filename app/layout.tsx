import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Sora } from "next/font/google";
import contentData from "@/content/moroute-content.json";
import type { MorouteContent } from "@/types/content";
import "./globals.css";

const content = contentData as MorouteContent;

const fallbackSiteUrl = "https://moroute-demo.fttgsolutions.com";

function resolveMetadataBase() {
  const rawSiteUrl = content.meta.siteUrl?.trim();
  if (!rawSiteUrl) {
    return new URL(fallbackSiteUrl);
  }

  const siteUrl = /^https?:\/\//i.test(rawSiteUrl) ? rawSiteUrl : `https://${rawSiteUrl}`;

  try {
    return new URL(siteUrl);
  } catch {
    return new URL(fallbackSiteUrl);
  }
}

const metadataBase = resolveMetadataBase();

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
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: `${content.brand} app preview`
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: content.meta.title,
    description: content.meta.description,
    images: ["/twitter-image"]
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
