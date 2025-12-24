import { ImageResponse } from "next/og";

export const runtime = "edge";

function clampText(text: string) {
  const max = 80;
  return text.length > max ? text.slice(0, max) + "…" : text;
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const text = clampText(searchParams.get("text") ?? "");
  const name = clampText(searchParams.get("name") ?? "");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "linear-gradient(180deg, #0b1020 0%, #102a2a 100%)",
          color: "white",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
        }}
      >
        <div style={{ fontSize: 56, fontWeight: 700 }}>🎄 聖誕抽籤</div>

        <div
          style={{
            background: "rgba(255,255,255,0.10)",
            border: "2px solid rgba(255,255,255,0.18)",
            borderRadius: 40,
            padding: 60,
            fontSize: 64,
            lineHeight: 1.25,
            textAlign: "center",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: 1100,
          }}
        >
          {text || "（空籤）"}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 28,
            opacity: 0.9,
          }}
        >
          <div>{name ? `抽籤者：${name}` : "祝你聖誕快樂 ✨"}</div>
          <div>#ChristmasDraw</div>
        </div>
      </div>
    ),
    { width: 1080, height: 1920 }
  );
}
