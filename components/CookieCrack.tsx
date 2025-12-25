"use client";

import { useEffect, useState, useCallback } from "react";

type Props = {
  onCrackDone?: () => void;
  auto?: boolean; // 在 draw 頁可用 auto=true 進頁就裂
  disabled?: boolean;
};

export function CookieCrack({ onCrackDone, auto = false, disabled = false }: Props) {
  const [cracking, setCracking] = useState(false);
  const [cracked, setCracked] = useState(false);

  const start = useCallback(() => {
    if (disabled || cracking || cracked) return;
    setCracking(true);

    // 動畫總長（跟 CSS duration 對齊）
    window.setTimeout(() => {
      setCracked(true);
      setCracking(false);
      onCrackDone?.();
    }, 1200);
  }, [cracked, cracking, onCrackDone, disabled]);

  useEffect(() => {
    if (auto && !disabled) start();
  }, [auto, disabled, start]);

  return (
    <div className="flex flex-col items-center">
      <div className="relative h-[240px] w-[240px] select-none">
        {/* 光暈 */}
        <div
          className={[
            "absolute inset-0 rounded-full blur-2xl opacity-30",
            cracking || cracked ? "scale-110" : "scale-100",
            "bg-emerald-300/40 transition-transform duration-700",
          ].join(" ")}
        />

        {/* 左半邊 */}
        <div
          className={[
            "cookie-half left absolute top-0 h-full w-1/2 overflow-hidden",
            cracked ? "cookie-left-cracked" : "",
            cracking ? "cookie-left-cracking" : "",
          ].join(" ")}
        >
          <div className="cookie cookie-left" />
        </div>

        {/* 右半邊 */}
        <div
          className={[
            "cookie-half right absolute top-0 right-0 h-full w-1/2 overflow-hidden",
            cracked ? "cookie-right-cracked" : "",
            cracking ? "cookie-right-cracking" : "",
          ].join(" ")}
        >
          <div className="cookie cookie-right" />
        </div>

        {/* 裂痕 */}
        <div
          className={[
            "absolute left-1/2 top-0 h-full w-[10px] -translate-x-1/2",
            cracking || cracked ? "opacity-100" : "opacity-0",
            "transition-opacity duration-200",
          ].join(" ")}
        >
          <div className="h-full w-full crack-line" />
        </div>

        {/* 碎屑 */}
        <div className={["crumbs", cracking || cracked ? "crumbs-go" : ""].join(" ")}>
          {Array.from({ length: 10 }).map((_, i) => (
            <span key={i} className={`crumb c${i + 1}`} />
          ))}
        </div>
      </div>

      {!disabled && (
        <>
          <button
            onClick={start}
            disabled={cracking || cracked}
            className="mt-6 w-full max-w-xs rounded-xl border border-white/15 bg-white/10 px-5 py-3 text-left disabled:opacity-50"
          >
            {cracked ? "已裂開 ✅" : cracking ? "裂開中…" : "開始抽籤 →"}
          </button>

          <div className="mt-2 text-xs opacity-70">點一下餅乾，讓它裂開，抽出你的聖誕籤 🍪</div>
        </>
      )}
    </div>
  );
}
