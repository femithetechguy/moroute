import type { MorouteContent } from "@/types/content";
import type { FeatureIconName } from "@/types/content";
import type { CSSProperties } from "react";
import type { LucideIcon } from "lucide-react";
import { ChartLine, MapPinned, Megaphone, Route, ShieldAlert, ShieldCheck } from "lucide-react";

type FeaturesSectionProps = {
  features: MorouteContent["features"];
};

const ICONS: Record<FeatureIconName, LucideIcon> = {
  "shield-alert": ShieldAlert,
  "map-pinned": MapPinned,
  route: Route,
  megaphone: Megaphone,
  "shield-check": ShieldCheck,
  "chart-line": ChartLine
};

const FEATURE_SHOWCASE_SHOTS = [
  { src: "/images/manage_service_feature.png", alt: "MoRoute services and incident actions" },
  { src: "/images/somescreenshot/screenshot14.jpeg", alt: "MoRoute live route safety map" },
  { src: "/images/somescreenshot/screenshot38.jpeg", alt: "MoRoute trip progress route view" },
  { src: "/images/somescreenshot/screenshot50.jpeg", alt: "MoRoute community safety feed" }
];

export default function FeaturesSection({ features }: FeaturesSectionProps) {
  const isLongSectionCopy = features.sectionTitle.length > 120;

  return (
    <section id="features" data-reveal>
      <div className="section-tag">{features.sectionTag}</div>
      <div className={`section-title${isLongSectionCopy ? " section-title--body" : ""}`}>{features.sectionTitle}</div>

      <div className="feature-showcase" aria-label="MoRoute app screenshot gallery">
        {FEATURE_SHOWCASE_SHOTS.map((shot, index) => (
          <figure
            className="feature-showcase-card"
            key={shot.src}
            style={{ "--stagger": `${index * 90 + 90}ms` } as CSSProperties}
          >
            <img src={shot.src} alt={shot.alt} loading="lazy" />
          </figure>
        ))}
      </div>

      <div className="features-grid">
        {features.items.map((feature, index) => {
          const Icon = ICONS[feature.icon];

          return (
            <article
              className="feature-card"
              key={feature.name}
              style={{ "--stagger": `${index * 70 + 120}ms` } as CSSProperties}
            >
              <div className={`feature-icon icon-${feature.tone}`}>
                <Icon size={20} strokeWidth={2.2} />
              </div>
              <div className="feature-name">{feature.name}</div>
              <div className="feature-desc">{feature.description}</div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
