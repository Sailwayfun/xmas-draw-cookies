"use client";

import type { LiffSDK } from "@/lib/liff";

type Identity = {
  mode: "liff" | "dev";
  userId: string;
  displayName: string;
  liff: LiffSDK | null;
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

  try {
    const { initLiff } = await import("./liff");
    const res = await initLiff(liffId);

    if (!res) {
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
