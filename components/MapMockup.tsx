import type { HeroContent } from "@/types/content";
import type { CSSProperties } from "react";

type MapMockupProps = {
  map: HeroContent["map"];
};

export default function MapMockup({ map }: MapMockupProps) {
  const floatingShots = [
    { src: "/images/homescreen.jpg", alt: "MoRoute home dashboard" },
    { src: "/images/manage_service_feature.png", alt: "MoRoute service actions" }
  ];

  return (
    <div className="map-frame" id="safety-map">
      <div className="map-phone-surface">
        <img src="/images/somescreenshot/screenshot27.jpeg" alt="MoRoute route risk map in the app" className="map-main-shot" />
      </div>
      <div className="map-texture" style={{ backgroundImage: `url(${map.texturePath})` }} />
      <div className="map-main-overlay" />
      <div className="map-overlay" />

      <div className="map-floating-shots" aria-hidden="true">
        {floatingShots.map((shot, index) => (
          <div className="map-mini-shot" key={shot.src} style={{ "--stagger": `${index * 150 + 620}ms` } as CSSProperties}>
            <img src={shot.src} alt={shot.alt} loading="lazy" />
          </div>
        ))}
      </div>

      <div className="chip chip-green chip-float" style={{ top: "50px", left: "20px" }}>
        <div className="chip-dot" style={{ background: "#3dff8f" }} />
        {map.safeChip}
      </div>
      <div className="chip chip-red chip-float chip-float-delayed" style={{ top: "50px", right: "20px" }}>
        <div className="chip-dot" style={{ background: "#ff4d4d" }} />
        {map.incidentChip}
      </div>

      <div className="map-info-card map-info-card-reveal">
        <div>
          <div className="info-label">{map.info.etaLabel}</div>
          <div className="info-val">
            {map.info.etaValue} <span>- {map.info.etaExtra}</span>
          </div>
        </div>

        <div style={{ textAlign: "right" }}>
          <div className="info-label">{map.info.safetyLabel}</div>
          <div className="info-val" style={{ color: "var(--green)" }}>
            {map.info.safetyValue} <span>/ {map.info.safetyMax}</span>
          </div>
        </div>

        <button type="button" className="sos-btn">
          {map.sosLabel}
        </button>
      </div>
    </div>
  );
}
