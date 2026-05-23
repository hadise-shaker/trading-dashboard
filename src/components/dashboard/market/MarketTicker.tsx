"use client";

import { useEffect, useState } from "react";
import { SYMBOLS } from "@/constants/market";

type Tick = { symbol: string; price: number; change: number };

async function fetchTicks(): Promise<Tick[]> {
  const results = await Promise.allSettled(
    SYMBOLS.map((s) => fetch(`/api/market/price?symbol=${s}`).then((r) => r.json()))
  );
  return results
    .map((r, i) => (r.status === "fulfilled" ? { symbol: SYMBOLS[i], ...r.value } : null))
    .filter(Boolean) as Tick[];
}

function TickItem({ t }: { t: Tick }) {
  const isPositive = t.change >= 0;
  return (
    <div className="flex items-center gap-2 px-5 border-r border-(--border) h-9 shrink-0">
      <span className="text-xs font-bold text-foreground">
        {t.symbol.replace("USDT", "")}
      </span>
      <span className="font-num text-[11px] text-(--muted)">
        ${t.price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
      </span>
      <span className={`font-num text-[11px] font-semibold ${isPositive ? "text-[#00C896]" : "text-[#E8293B]"}`}>
        {isPositive ? "+" : ""}{t.change.toFixed(2)}%
      </span>
    </div>
  );
}

export default function MarketTicker() {
  const [ticks, setTicks] = useState<Tick[]>([]);

  useEffect(() => {
    fetchTicks().then(setTicks);
    const id = setInterval(() => fetchTicks().then(setTicks), 30000);
    return () => clearInterval(id);
  }, []);

  if (!ticks.length) return <div className="h-9 border-b border-(--border) shrink-0" />;

  const doubled = [...ticks, ...ticks];

  return (
    <div className="ticker-wrap h-9 border-b border-(--border) bg-background shrink-0">
      <div className="ticker-inner">
        {doubled.map((t, i) => (
          <TickItem key={i} t={t} />
        ))}
      </div>
    </div>
  );
}