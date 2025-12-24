"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { drawTicketStable, resetDraw } from "@/lib/draw";
import type { Ticket } from "@/data/tickets";
import { DrawCard } from "@/components/DrawCard";
import { ShareButtons } from "@/components/ShareButtons";
import { CookieCrack } from "@/components/CookieCrack";
import { getIdentity } from "@/lib/identity";
import type { LiffSDK } from "@/lib/liff";

type Identity = {
  mode: "liff" | "dev";
  userId: string;
  displayName: string;
  liff: LiffSDK | null;
};

export default function DrawClient() {
  const LIFF_ID = process.env.NEXT_PUBLIC_LIFF_ID;
  const APP_URL = process.env.NEXT_PUBLIC_APP_URL!;

  const [loading, setLoading] = useState(true);
  const [identity, setIdentity] = useState<Identity | null>(null);
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [revealRequested, setRevealRequested] = useState(false);
  const [crackKey, setCrackKey] = useState(0);
  const [error, setError] = useState<string>("");
  const [isFadingOut, setIsFadingOut] = useState(false);
  const fadeTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    let alive = true;

    (async () => {
      try {
        const id = await getIdentity(LIFF_ID);
        if (!alive) return;

        setIdentity(id);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : String(err));
      } finally {
        setLoading(false);
      }
    })();

    return () => {
      alive = false;
      if (fadeTimeoutRef.current) {
        window.clearTimeout(fadeTimeoutRef.current);
      }
    };
  }, [LIFF_ID]);

  useEffect(() => {
    if (!identity || !revealRequested) return;
    const t = drawTicketStable(identity.userId);
    setTicket(t);
  }, [identity, revealRequested]);

  const ogUrl = useMemo(() => {
    const text = ticket?.text ?? "";
    const name = identity?.displayName ?? "";
    const category = ticket?.category ?? "";
    const url = new URL("/api/og", APP_URL);
    url.searchParams.set("text", text);
    url.searchParams.set("name", name);
    if (category) url.searchParams.set("category", category);
    return url.toString();
  }, [ticket, identity, APP_URL]);

  function onRedraw() {
    if (!identity) return;
    setIsFadingOut(true);
    fadeTimeoutRef.current = window.setTimeout(() => {
      resetDraw(identity.userId);
      setRevealRequested(false);
      setTicket(null);
      setCrackKey((value) => value + 1);
      setIsFadingOut(false);
    }, 220);
  }

  function handleCrackDone() {
    setRevealRequested(true);
  }

  return (
    <main className="mx-auto max-w-xl px-6 py-10">
      <h1 className="text-3xl font-bold">🎄 抽籤區</h1>

      {loading && <div className="mt-4 opacity-80">初始化中…</div>}

      {error && (
        <div className="mt-4 rounded-xl border border-red-400/30 bg-red-500/10 p-4 text-sm">
          初始化失敗：{error}
        </div>
      )}

      {!loading && identity && (
        <>
          <div className="mt-3 text-xs opacity-70">
            模式：{identity.mode === "liff" ? "LIFF（正式）" : "DEV（瀏覽器預覽）"}
            {identity.mode === "dev" && (
              <>
                {" "}
                — 你可以用 <code>?dev=1&name=Sail</code> 自訂預覽身份
              </>
            )}
          </div>

          <div className="mt-6">
            {!ticket ? (
              <div className={isFadingOut ? "fade-out-down" : ""}>
                <CookieCrack key={crackKey} onCrackDone={handleCrackDone} />
              </div>
            ) : (
              <div className={isFadingOut ? "fade-out-down" : "fade-in-up"} key={ticket.id}>
                <DrawCard name={identity.displayName} ticket={ticket} />

                <div className="mt-4 flex gap-2">
                  <button
                    className="flex-1 rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-left"
                    onClick={onRedraw}
                  >
                    我想重抽（重置本機）
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

                <ShareButtons liff={identity.liff} ogUrl={ogUrl} disabled={!ticket} />
              </div>
            )}
          </div>
        </>
      )}
    </main>
  );
}
