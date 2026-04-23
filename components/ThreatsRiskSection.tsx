import type { MorouteContent } from "@/types/content";
import type { CSSProperties } from "react";

type ThreatsRiskSectionProps = {
  threats: MorouteContent["threats"];
};

function clampPercent(score: number): number {
  return Math.max(0, Math.min(score * 10, 100));
}

export default function ThreatsRiskSection({ threats }: ThreatsRiskSectionProps) {
  const hasSectionTag = threats.sectionTag.trim().length > 0;

  return (
    <section className="threats-section" data-reveal>
      <div className="threats-header">
        {hasSectionTag ? <div className="section-tag">{threats.sectionTag}</div> : null}
        <div className="section-title threat-title-main">{threats.sectionTitle}</div>

        <div className="threat-list">
          {threats.items.map((item, index) => (
            <article
              className="threat-item"
              key={item.title}
              style={{ "--stagger": `${index * 70 + 120}ms` } as CSSProperties}
            >
              <div className="threat-number">{String(index + 1).padStart(2, "0")}</div>
              <div>
                <div className="threat-title">{item.title}</div>
                <div className="threat-desc">{item.description}</div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <aside className="risk-panel">
        <div className="risk-panel-title">{threats.riskPanel.title}</div>

        {threats.riskPanel.regions.map((region, index) => (
          <div
            className="risk-row"
            key={region.label}
            style={{ "--stagger": `${index * 85 + 220}ms` } as CSSProperties}
          >
            <div className="risk-row-top">
              <span className="risk-row-label">{region.label}</span>
              <span className="risk-row-val" style={{ color: `var(--${region.color})` }}>
                {region.score.toFixed(1)}
              </span>
            </div>
            <div className="bar-track">
              <div className="bar-fill" style={{ width: `${clampPercent(region.score)}%`, background: `var(--${region.color})` }} />
            </div>
          </div>
        ))}
      </aside>
    </section>
  );
}
