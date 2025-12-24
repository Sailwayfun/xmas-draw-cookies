import { tickets, type Ticket } from "@/data/tickets";

export function drawTicketStable(userId: string): Ticket {
  const key = `xmas_2025_${userId}`;
  const saved = localStorage.getItem(key);
  if (saved) return JSON.parse(saved) as Ticket;

  const ticket = tickets[Math.floor(Math.random() * tickets.length)];
  localStorage.setItem(key, JSON.stringify(ticket));
  return ticket;
}

export function resetDraw(userId: string) {
  const key = `xmas_2025_${userId}`;
  localStorage.removeItem(key);
}
