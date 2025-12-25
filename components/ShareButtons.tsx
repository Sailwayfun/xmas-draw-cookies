"use client";

import type { LiffSDK } from "@/lib/liff";

type Props = {
  liff: LiffSDK | null;
  ogUrl: string;
  disabled?: boolean;
};

export function ShareButtons({ liff, ogUrl, disabled }: Props) {
  async function shareToLine() {
    if (!liff) return;

    const shareUrl = `${ogUrl}${ogUrl.includes("?") ? "&" : "?"}v=${Date.now()}`;

    await liff.shareTargetPicker([
      {
        type: "text",
        text: "🎄 我抽到一張聖誕籤！\n（想玩：把這張圖存下來發限動也行）",
      },
      {
        type: "image",
        originalContentUrl: shareUrl,
        previewImageUrl: shareUrl,
      },
    ]);
  }

  async function copyImageLink() {
    await navigator.clipboard.writeText(ogUrl);
    alert("已複製小卡圖片連結！");
  }

  return (
    <div className="mt-4 flex flex-col gap-2">
      <button
        className="rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-left disabled:opacity-50"
        onClick={shareToLine}
        disabled={disabled || !liff}
      >
        分享到 LINE（含小卡）
      </button>

      <button
        className="rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-left disabled:opacity-50"
        onClick={copyImageLink}
        disabled={disabled}
      >
        複製小卡圖片連結（可貼到任何地方）
      </button>

      <div className="text-xs opacity-70">
        IG/FB 限動最穩做法：把小卡「存圖」或用連結開啟後截圖，再上傳到 Stories。
      </div>
    </div>
  );
}
