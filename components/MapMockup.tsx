import type { HeroContent } from "@/types/content";

type MapMockupProps = {
  map: HeroContent["map"];
};

export default function MapMockup({ map }: MapMockupProps) {
  return (
    <div className="map-frame" id="safety-map">
      <div className="map-grid" />
      <div className="map-texture" style={{ backgroundImage: `url(${map.texturePath})` }} />
      <svg className="map-roads" viewBox="0 0 520 400" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M0 200 Q130 178 260 200 Q390 222 520 200" stroke="rgba(255,255,255,0.06)" strokeWidth="16" fill="none" />
        <path d="M0 130 Q90 124 180 142 Q270 160 360 110 Q430 75 520 88" stroke="rgba(255,255,255,0.04)" strokeWidth="11" fill="none" />
        <path d="M200 0 Q215 100 224 200 Q233 300 248 400" stroke="rgba(255,255,255,0.05)" strokeWidth="9" fill="none" />
        <path d="M350 0 Q364 68 342 136 Q318 204 352 272 Q374 336 362 400" stroke="rgba(255,255,255,0.04)" strokeWidth="7" fill="none" />
        <path d="M55 0 Q78 90 68 180 Q58 270 90 400" stroke="rgba(255,255,255,0.03)" strokeWidth="7" fill="none" />
        <path
          d="M45 295 Q135 248 226 236 Q316 224 396 182 Q440 158 475 136"
          stroke="#3dff8f"
          strokeWidth="3.5"
          fill="none"
          opacity="0.85"
        />
        <circle cx="45" cy="295" r="7" fill="#3dff8f" />
        <circle cx="45" cy="295" r="13" fill="rgba(61,255,143,0.15)" />
        <circle cx="475" cy="136" r="7" fill="#3dff8f" />
        <circle cx="475" cy="136" r="13" fill="rgba(61,255,143,0.15)" />
        <circle cx="330" cy="270" r="34" fill="rgba(255,77,77,0.07)" stroke="rgba(255,77,77,0.24)" strokeWidth="1" />
        <circle cx="330" cy="270" r="6" fill="#ff4d4d" />
        <circle cx="155" cy="178" r="25" fill="rgba(255,160,64,0.06)" stroke="rgba(255,160,64,0.2)" strokeWidth="1" />
        <circle cx="155" cy="178" r="4.5" fill="#ffa040" />
      </svg>
      <div className="map-overlay" />

      <div className="chip chip-green" style={{ top: "50px", left: "20px" }}>
        <div className="chip-dot" style={{ background: "#3dff8f" }} />
        {map.safeChip}
      </div>
      <div className="chip chip-red" style={{ top: "50px", right: "20px" }}>
        <div className="chip-dot" style={{ background: "#ff4d4d" }} />
        {map.incidentChip}
      </div>

      <div className="map-info-card">
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
