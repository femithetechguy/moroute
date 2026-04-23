import contentData from "@/content/moroute-content.json";
import type { MorouteContent } from "@/types/content";

const content = contentData as MorouteContent;

const fallbackSiteUrl = "https://moroute-demo.fttgsolutions.com";

function normalizeSiteUrl(rawSiteUrl?: string) {
  if (!rawSiteUrl?.trim()) {
    return fallbackSiteUrl;
  }

  const trimmed = rawSiteUrl.trim();
  const siteUrl = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;

  try {
    return new URL(siteUrl).toString().replace(/\/+$/, "");
  } catch {
    return fallbackSiteUrl;
  }
}

export function getSiteUrl() {
  return normalizeSiteUrl(content.meta.siteUrl);
}

export function getMetadataBase() {
  return new URL(getSiteUrl());
}
