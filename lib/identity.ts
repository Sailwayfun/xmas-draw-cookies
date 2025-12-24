"use client";

type Identity = {
  mode: "liff" | "dev";
  userId: string;
  displayName: string;
  liff: any | null;
};

function getOrCreateDevUserId() {
  const key = "xmas_dev_userId";
  const saved = localStorage.getItem(key);
  if (saved) return saved;

  const id = "dev_" + Math.random().toString(36).slice(2, 10);
  localStorage.setItem(key, id);
  return id;
}

export async function getIdentity(liffId?: string): Promise<Identity> {
  // 允許用 ?dev=1 或 NEXT_PUBLIC_DEV=1 強制 dev mode
  const url = new URL(window.location.href);
  const forceDev = url.searchParams.get("dev") === "1";

  const devName = url.searchParams.get("name") || "Dev Preview";

  if (forceDev || !liffId) {
    return {
      mode: "dev",
      userId: getOrCreateDevUserId(),
      displayName: devName,
      liff: null,
    };
  }

  // 嘗試載入 LIFF：失敗就回退 dev
  try {
    const { initLiff } = await import("./liff");
    const res = await initLiff(liffId);

    // 若在瀏覽器且未登入，initLiff 會呼叫 liff.login() 並 return null
    // 但在 dev 預覽我們不想跳轉，因此：偵測非 LINE 環境時直接 fallback
    if (!res) {
      // 如果你仍想在瀏覽器也能跳 LINE login，就把這段 fallback 拿掉
      return {
        mode: "dev",
        userId: getOrCreateDevUserId(),
        displayName: devName,
        liff: null,
      };
    }

    return {
      mode: "liff",
      userId: res.profile.userId,
      displayName: res.profile.displayName,
      liff: res.liff,
    };
  } catch {
    return {
      mode: "dev",
      userId: getOrCreateDevUserId(),
      displayName: devName,
      liff: null,
    };
  }
}
