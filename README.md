# Xmas LIFF Draw

一個以 LIFF 打開即可抽籤、產生 Story 小卡（OG image）的 Next.js 專案骨架。

## 開始

```bash
pnpm install
pnpm dev
```

瀏覽 `http://localhost:3000`。

## 環境變數

建立或更新 `.env.local`：

```env
NEXT_PUBLIC_LIFF_ID=YOUR_LIFF_ID
NEXT_PUBLIC_APP_URL=http://localhost:3000
# 開發時強制 dev 模式（不走 LIFF login）
NEXT_PUBLIC_DEV_MODE=0
```

## LIFF 開發/正式流程

### 1) 建立 LIFF App

到 LINE Developers 建立 Provider → 建立 LIFF App：

- **LIFF app type**：`Full`
- **Endpoint URL**：開發用 `https://<your-ngrok-or-vercel-domain>`
- **Scopes**：
  - `profile`（拿使用者名稱/頭像）
- **Open in external browser**：依需求

取得 LIFF ID，填入 `NEXT_PUBLIC_LIFF_ID`。

### 2) 本地測試（建議）

LIFF 需要 https 網域，建議用 ngrok 或部署到 Vercel：

- ngrok（範例）：
  ```bash
  ngrok http 3000
  ```
  取得 `https://xxxx.ngrok.io` 後填入 `NEXT_PUBLIC_APP_URL`。

- Vercel：部署後把 `NEXT_PUBLIC_APP_URL` 改成正式網域。

### 3) LIFF 連結

打開方式：

```
https://liff.line.me/<YOUR_LIFF_ID>
```

在 LINE 內開啟可正常進入 LIFF 功能。

## 重要路徑

- UI 入口：`app/DrawClient.tsx`
- LIFF 初始化：`lib/liff.ts`
- 身份模式（LIFF/DEV）：`lib/identity.ts`
- OG 小卡：`app/api/og/route.tsx`
- 背景圖：`public/og/*.png`

## 分享小卡

- 透過 `ShareButtons` 使用 `liff.shareTargetPicker` 分享圖片。
- 若非 LIFF 環境，仍可複製 OG 圖片連結或開啟下載。

## 常見問題

### Q: 在瀏覽器開啟時會一直跳轉登入？

A: 已限制只有在 `liff.isInClient()` 才會 login；若要完全強制 dev 模式，設 `NEXT_PUBLIC_DEV_MODE=1`。

### Q: OG 小卡背景沒顯示？

A: 確認 `NEXT_PUBLIC_APP_URL` 是 https 網域且可公開存取 `public/og/*.png`。

## 部署提醒

- 更新 `NEXT_PUBLIC_APP_URL` 為正式網域
- 在 LINE Developers Console 更新 LIFF Endpoint URL

