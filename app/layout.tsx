import Script from "next/script";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-Hant">
      <body className="min-h-screen bg-gradient-to-b from-slate-950 to-emerald-950 text-white">
        <Script
          src="https://static.line-scdn.net/liff/edge/2/sdk.js"
          strategy="beforeInteractive"
        />
        {children}
      </body>
    </html>
  );
}
