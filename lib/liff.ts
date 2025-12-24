"use client";

type LiffProfile = {
  userId: string;
  displayName: string;
};

type LiffShareMessage =
  | { type: "text"; text: string }
  | { type: "image"; originalContentUrl: string; previewImageUrl: string };

type LiffSDK = {
  init: (options: { liffId: string }) => Promise<void>;
  isInClient: () => boolean;
  isLoggedIn: () => boolean;
  login: () => void;
  getProfile: () => Promise<LiffProfile>;
  shareTargetPicker: (messages: LiffShareMessage[]) => Promise<void>;
};

declare global {
  interface Window {
    liff?: LiffSDK;
  }
}

export type { LiffProfile, LiffSDK, LiffShareMessage };

export async function loadLiffSDK(): Promise<LiffSDK> {
  if (typeof window === "undefined") throw new Error("Client only");

  if (window.liff) return window.liff;

  await new Promise<void>((resolve, reject) => {
    const s = document.createElement("script");
    s.src = "https://static.line-scdn.net/liff/edge/2/sdk.js";
    s.onload = () => resolve();
    s.onerror = () => reject(new Error("Failed to load LIFF SDK"));
    document.head.appendChild(s);
  });

  if (!window.liff) throw new Error("LIFF not found after script loaded");
  return window.liff;
}

export async function initLiff(liffId: string) {
  const liff = await loadLiffSDK();
  await liff.init({ liffId });

  if (!liff.isLoggedIn()) {
    if (liff.isInClient()) {
      liff.login();
    }
    return null;
  }

  const profile = await liff.getProfile();
  return { liff, profile };
}
