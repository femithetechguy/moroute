import type { MorouteContent } from "@/types/content";
import type { FeatureIconName } from "@/types/content";
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

export default function FeaturesSection({ features }: FeaturesSectionProps) {
  return (
    <section id="features">
      <div className="section-tag">{features.sectionTag}</div>
      <div className="section-title">{features.sectionTitle}</div>

      <div className="features-grid">
        {features.items.map((feature) => {
          const Icon = ICONS[feature.icon];

          return (
            <article className="feature-card" key={feature.name}>
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
