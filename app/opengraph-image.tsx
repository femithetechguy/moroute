import { ImageResponse } from "next/og";

export const runtime = "edge";

export const size = {
  width: 1200,
  height: 630
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          overflow: "hidden",
          background: "linear-gradient(135deg, #052436 0%, #0a4b5f 55%, #13a083 100%)",
          color: "#f7fffd",
          fontFamily: "Arial, sans-serif"
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: "-180px auto auto -120px",
            width: "560px",
            height: "560px",
            borderRadius: "9999px",
            background: "rgba(19, 160, 131, 0.3)"
          }}
        />
        <div
          style={{
            position: "absolute",
            right: "-110px",
            bottom: "-170px",
            width: "620px",
            height: "620px",
            borderRadius: "9999px",
            background: "rgba(7, 37, 73, 0.55)"
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "58px 70px",
            width: "100%",
            height: "100%",
            position: "relative"
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "14px"
            }}
          >
            <div
              style={{
                width: "18px",
                height: "18px",
                borderRadius: "9999px",
                background: "#7df0d6"
              }}
            />
            <div
              style={{
                fontSize: "34px",
                letterSpacing: "0.04em",
                fontWeight: 700
              }}
            >
              MoRoute
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              maxWidth: "860px"
            }}
          >
            <div
              style={{
                fontSize: "64px",
                lineHeight: 1.08,
                fontWeight: 800,
                letterSpacing: "-0.02em"
              }}
            >
              Safer Routes, Real-Time Threat Intelligence
            </div>
            <div
              style={{
                fontSize: "30px",
                lineHeight: 1.3,
                color: "rgba(247, 255, 253, 0.95)"
              }}
            >
              Plan smarter journeys with live risk alerts, SOS support, and trusted community reports.
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              fontSize: "24px",
              color: "rgba(247, 255, 253, 0.9)"
            }}
          >
            <div
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "9999px",
                background: "#8efadf"
              }}
            />
            <div>moroute.vercel.app</div>
          </div>
        </div>
      </div>
    ),
    size
  );
}
