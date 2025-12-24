import Link from "next/link";

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen max-w-xl flex-col justify-center px-6 py-10">
      <h1 className="text-3xl font-bold">🎄 聖誕抽籤</h1>
      <p className="mt-3 opacity-80">
        請在 LINE 內開啟 LIFF 連結，抽一張聖誕餅乾籤並生成限動小卡。
      </p>

      <Link
        href="/draw"
        className="mt-6 inline-flex w-fit rounded-xl border border-white/15 bg-white/10 px-5 py-3"
      >
        開始抽籤 →
      </Link>

      <div className="mt-8 text-xs opacity-60">
        LIFF 連結：<br />
        <code>https://liff.line.me/&lt;YOUR_LIFF_ID&gt;</code>
      </div>
    </main>
  );
}
