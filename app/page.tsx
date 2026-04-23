import contentData from "@/content/moroute-content.json";
import type { MorouteContent } from "@/types/content";
import type { CSSProperties } from "react";
import NavBar from "@/components/NavBar";
import HeroSection from "@/components/HeroSection";
import StatsBar from "@/components/StatsBar";
import FeaturesSection from "@/components/FeaturesSection";
import ThreatsRiskSection from "@/components/ThreatsRiskSection";
import CtaSection from "@/components/CtaSection";
import ContactSection from "@/components/ContactSection";
import MobileBackToTop from "@/components/MobileBackToTop";
import SiteFooter from "@/components/SiteFooter";
import MotionEnhancer from "@/components/MotionEnhancer";
import { getSiteUrl } from "@/lib/seo";

const content = contentData as MorouteContent;
const siteUrl = getSiteUrl();

const pageTextureStyle = {
  "--page-texture-url": `url(${content.assets.pageTexturePath})`
} as CSSProperties;

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: content.brand,
    url: siteUrl,
    logo: new URL(content.assets.brandLogoPath, `${siteUrl}/`).toString(),
    description: content.meta.description,
    sameAs: content.cta.stores.map((store) => store.href)
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: content.brand,
    url: siteUrl,
    description: content.meta.description,
    inLanguage: "en"
  }
];

const structuredDataJson = JSON.stringify(structuredData).replace(/</g, "\\u003c");

export default function Home() {
  return (
    <main style={pageTextureStyle}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: structuredDataJson }} />
      <MotionEnhancer />
      <NavBar
        brand={content.brand}
        nav={content.nav}
        logoPath={content.assets.brandLogoPath}
        logoAlt={content.assets.brandLogoAlt}
      />
      <HeroSection hero={content.hero} texturePath={content.assets.heroTexturePath} />
      <StatsBar stats={content.stats} />
      <FeaturesSection features={content.features} />
      <ThreatsRiskSection threats={content.threats} />
      <CtaSection cta={content.cta} />
      <ContactSection contact={content.contact} />
      <MobileBackToTop ui={content.ui} />
      <SiteFooter
        brand={content.brand}
        footer={content.footer}
        logoPath={content.assets.brandLogoPath}
        logoAlt={content.assets.brandLogoAlt}
      />
    </main>
  );
}
