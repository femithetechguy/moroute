import { ImageResponse } from "next/og";

export const runtime = "edge";

export const size = {
  width: 1200,
  height: 630
};

export const contentType = "image/png";

export default function TwitterImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "56px",
          background: "linear-gradient(145deg, #051b2a 0%, #0f3855 48%, #169275 100%)",
          color: "#f7fffd",
          fontFamily: "Arial, sans-serif"
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            border: "1px solid rgba(247, 255, 253, 0.25)",
            borderRadius: "26px",
            padding: "44px 48px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            background: "rgba(8, 26, 38, 0.35)"
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
            <div
              style={{
                fontSize: "28px",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                color: "rgba(247, 255, 253, 0.85)"
              }}
            >
              MoRoute
            </div>
            <div style={{ fontSize: "62px", lineHeight: 1.08, fontWeight: 800 }}>
              Road Safety App
            </div>
            <div style={{ fontSize: "31px", lineHeight: 1.28, maxWidth: "920px" }}>
              Find safer routes with live threat updates, SOS emergency support, and trusted travel intelligence.
            </div>
          </div>

          <div style={{ fontSize: "23px", color: "rgba(247, 255, 253, 0.88)" }}>
            Real-time alerts • Verified reports • Smart route planning
          </div>
        </div>
      </div>
    ),
    size
  );
}
