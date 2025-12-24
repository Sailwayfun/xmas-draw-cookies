"use client";

import type { Ticket } from "@/data/tickets";

const categoryLabel: Record<Ticket["category"], string> = {
  blessing: "溫暖祝福",
  task: "小任務",
  prank: "微惡作劇",
  xmas: "聖誕限定",
  future: "未來暗示",
  healing: "情緒療癒",
};

export function DrawCard({ name, ticket }: { name: string; ticket: Ticket | null }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
      <div className="text-sm opacity-80">嗨 {name}</div>

      <div className="mt-2 inline-flex rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs">
        {ticket ? categoryLabel[ticket.category] : "尚未抽籤"}
      </div>

      <div className="mt-5 text-2xl leading-snug">
        {ticket ? ticket.text : "按下『抽一張』，讓餅乾裂開 🍪"}
      </div>
    </div>
  );
}
