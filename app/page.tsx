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

const content = contentData as MorouteContent;

const pageTextureStyle = {
  "--page-texture-url": `url(${content.assets.pageTexturePath})`
} as CSSProperties;

export default function Home() {
  return (
    <main style={pageTextureStyle}>
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
