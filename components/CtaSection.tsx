import type { MorouteContent } from "@/types/content";
import type { CSSProperties } from "react";

type CtaSectionProps = {
  cta: MorouteContent["cta"];
};

const CTA_SHOTS = [
  { src: "/images/homescreen.jpg", alt: "MoRoute dashboard preview" },
  { src: "/images/somescreenshot/screenshot27.jpeg", alt: "MoRoute incident heatmap preview" },
  { src: "/images/somescreenshot/screenshot30.jpeg", alt: "MoRoute route alert preview" }
];

export default function CtaSection({ cta }: CtaSectionProps) {
  return (
    <section className="cta-section" id="download" data-reveal>
      <h2>{cta.title}</h2>
      <p>{cta.description}</p>

      <div className="cta-phone-stack" aria-label="MoRoute mobile app previews">
        {CTA_SHOTS.map((shot, index) => (
          <div className="cta-phone" key={shot.src} style={{ "--stagger": `${index * 110 + 180}ms` } as CSSProperties}>
            <img src={shot.src} alt={shot.alt} loading="lazy" />
          </div>
        ))}
      </div>

      <div className="store-btns">
        {cta.stores.map((store, index) => (
          <a
            href={store.href}
            className="store-btn-link"
            key={store.name}
            aria-label={store.alt}
            style={{ "--stagger": `${index * 120 + 240}ms` } as CSSProperties}
          >
            <img src={store.badgePath} alt={store.alt} className="store-badge" />
          </a>
        ))}
      </div>
    </section>
  );
}
