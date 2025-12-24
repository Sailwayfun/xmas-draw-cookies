import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-Hant">
      <body className="min-h-screen bg-gradient-to-b from-slate-950 to-emerald-950 text-white">
        {children}
      </body>
    </html>
  );
}
