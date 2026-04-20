import type { MorouteContent } from "@/types/content";

type CtaSectionProps = {
  cta: MorouteContent["cta"];
};

export default function CtaSection({ cta }: CtaSectionProps) {
  return (
    <section className="cta-section" id="download">
      <h2>{cta.title}</h2>
      <p>{cta.description}</p>

      <div className="store-btns">
        {cta.stores.map((store) => (
          <a href={store.href} className="store-btn-link" key={store.name} aria-label={store.alt}>
            <img src={store.badgePath} alt={store.alt} className="store-badge" />
          </a>
        ))}
      </div>
    </section>
  );
}
