import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";

export const runtime = "nodejs";

const categories = ["blessing", "task", "prank", "xmas", "future", "healing"] as const;
type Category = (typeof categories)[number];

const backgroundByCategory: Record<Category, string> = {
  blessing: "blessing.png",
  task: "task.png",
  prank: "prank.png",
  xmas: "xmas.png",
  future: "future.png",
  healing: "healing.png",
};

function clampText(text: string) {
  const max = 80;
  return text.length > max ? text.slice(0, max) + "…" : text;
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const text = clampText(searchParams.get("text") ?? "");
  const name = clampText(searchParams.get("name") ?? "");
  const categoryParam = searchParams.get("category");
  const category = categories.includes(categoryParam as Category)
    ? (categoryParam as Category)
    : "blessing";
  const bgPath = path.join(process.cwd(), "public", "og", backgroundByCategory[category]);
  const bgBuffer = await readFile(bgPath);
  const bgBase64 = bgBuffer.toString("base64");
  const bgUrl = `data:image/png;base64,${bgBase64}`;

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        color: "#ffffff",
        backgroundColor: "#0b1020",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <img
        src={bgUrl}
        alt="christmas background"
        style={{
          position: "absolute",
          left: -420,
          top: 0,
          width: 1920,
          height: 1920,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(180deg, rgba(6,10,18,0.55) 0%, rgba(8,14,22,0.7) 100%)",
        }}
      />

      <div
        style={{
          position: "absolute",
          left: 280,
          top: 720,
          width: 540,
          height: 560,
          fontSize: 64,
          lineHeight: 1.25,
          textAlign: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#3b2616",
          textShadow: "0 2px 10px rgba(255,255,255,0.35)",
          background: "rgba(255, 248, 220, 0.85)",
          padding: "40px",
        }}
      >
        {text || "（空籤）"}
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 60,
          left: 60,
          right: 60,
          display: "flex",
          justifyContent: "space-between",
          fontSize: 28,
          opacity: 0.9,
          textShadow: "0 4px 12px rgba(0,0,0,0.55)",
        }}
      >
        <div style={{ background: "#cccccc", color: "#333", padding: "0 8px" }}>
          {name ? `抽籤者：${name}` : "祝你聖誕快樂 ✨"}
        </div>
        <div style={{ background: "#cccccc", color: "#333", padding: "0 8px" }}>#ChristmasDraw</div>
      </div>
    </div>,
    {
      width: 1080,
      height: 1920,
      headers: {
        "Cache-Control": "no-store, max-age=0",
      },
    },
  );
}
