import Link from "next/link";

export default function Home() {
  return (
    <main className="mx-auto max-w-xl px-6 py-10">
      <h1 className="text-3xl font-bold">🎄 聖誕抽籤</h1>
      <p className="mt-3 opacity-80">
        在 LINE 裡打開，抽一張聖誕餅乾籤，還能做成限動小卡。
      </p>

      <Link
        href="/draw"
        className="mt-6 inline-flex rounded-xl border border-white/15 bg-white/10 px-5 py-3"
      >
        開始抽籤 →
      </Link>

      <div className="mt-8 text-xs opacity-60">
        提醒：正式給朋友玩時，請用 LIFF 連結開啟：<br />
        <code>https://liff.line.me/&lt;YOUR_LIFF_ID&gt;</code>
      </div>
    </main>
  );
}
