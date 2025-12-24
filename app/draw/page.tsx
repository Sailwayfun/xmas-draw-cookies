"use client";

import { useEffect, useMemo, useState } from "react";
import { initLiff } from "@/lib/liff";
import { drawTicketStable, resetDraw } from "@/lib/draw";
import type { Ticket } from "@/data/tickets";
import { DrawCard } from "@/components/DrawCard";
import { ShareButtons } from "@/components/ShareButtons";

type Profile = { userId: string; displayName: string };

export default function DrawPage() {
  const LIFF_ID = process.env.NEXT_PUBLIC_LIFF_ID!;
  const APP_URL = process.env.NEXT_PUBLIC_APP_URL!;

  const [loading, setLoading] = useState(true);
  const [liff, setLiff] = useState<any | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const res = await initLiff(LIFF_ID);
        if (!res) return;
        if (!alive) return;

        setLiff(res.liff);
        setProfile({ userId: res.profile.userId, displayName: res.profile.displayName });

        const t = drawTicketStable(res.profile.userId);
        setTicket(t);
      } catch (e: any) {
        setError(e?.message ?? String(e));
      } finally {
        setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, [LIFF_ID]);

  const ogUrl = useMemo(() => {
    const text = ticket?.text ?? "";
    const name = profile?.displayName ?? "";
    const url = new URL("/api/og", APP_URL);
    url.searchParams.set("text", text);
    url.searchParams.set("name", name);
    return url.toString();
  }, [ticket, profile, APP_URL]);

  function onRedraw() {
    if (!profile) return;
    resetDraw(profile.userId);
    const t = drawTicketStable(profile.userId);
    setTicket(t);
  }

  return (
    <main className="mx-auto max-w-xl px-6 py-10">
      <h1 className="text-3xl font-bold">🎄 抽籤區</h1>

      {loading && <div className="mt-4 opacity-80">初始化中…</div>}
      {error && (
        <div className="mt-4 rounded-xl border border-red-400/30 bg-red-500/10 p-4 text-sm">
          初始化失敗：{error}
          <div className="mt-2 opacity-80">
            如果你是用瀏覽器直接開，LIFF 能力可能有限；建議用 LINE 內開啟你的 LIFF 連結。
          </div>
        </div>
      )}

      {!loading && profile && (
        <>
          <div className="mt-6">
            <DrawCard name={profile.displayName} ticket={ticket} />
          </div>

          <div className="mt-4 flex gap-2">
            <button
              className="flex-1 rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-left"
              onClick={onRedraw}
            >
              我想重抽（同裝置重置）
            </button>

            <a
              className="flex-1 rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-left"
              href={ogUrl}
              target="_blank"
              rel="noreferrer"
            >
              開啟小卡圖片（可存圖）
            </a>
          </div>

          <ShareButtons liff={liff} ogUrl={ogUrl} disabled={!ticket} />
        </>
      )}
    </main>
  );
}
