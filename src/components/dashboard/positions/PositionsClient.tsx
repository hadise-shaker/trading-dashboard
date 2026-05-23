"use client";

import { useEffect, useState } from "react";
import { Position } from "@/lib/positions-generator";
import { Search, ArrowUpDown } from "lucide-react";

type StatusFilter = "All" | "Open" | "Closed";

export default function PositionsClient() {
  const [positions, setPositions] = useState<Position[]>([]);
  const [loading, setLoading]     = useState(true);
  const [filter, setFilter]       = useState<StatusFilter>("All");
  const [search, setSearch]       = useState("");

  useEffect(() => {
    fetch("/api/positions").then((r) => r.json()).then(setPositions).finally(() => setLoading(false));
  }, []);

  const filtered = positions.filter((p) => {
    const matchFilter = filter === "All" || p.status === filter;
    const matchSearch = p.symbol.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  const totalPL = filtered.reduce((acc, p) => acc + p.pl, 0);

  return (
    <div className="flex flex-col gap-4">
      {/* Controls */}
      <div className="flex items-center gap-3 flex-wrap">
        <div
          className="flex items-center gap-2 rounded-lg px-3 py-1.5"
          style={{ background: "var(--card)", border: "1px solid var(--border)" }}
        >
          <Search size={14} style={{ color: "var(--muted)" }} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search symbol…"
            className="bg-transparent border-none outline-none text-[13px] w-36"
            style={{ color: "var(--text-bright)" }}
          />
        </div>

        <div className="flex gap-0.5 rounded-lg p-[3px]" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
          {(["All", "Open", "Closed"] as StatusFilter[]).map((f) => (
            <button
              type="button"
              key={f}
              onClick={() => setFilter(f)}
              className="px-3.5 py-1.5 rounded-md text-xs font-semibold border-none transition-all duration-150"
              style={{
                background: filter === f ? "var(--bg)" : "transparent",
                color: filter === f ? "var(--text-bright)" : "var(--muted)",
              }}
            >
              {f}
            </button>
          ))}
        </div>

        <div
          className="ml-auto flex items-center gap-2 rounded-lg px-4 py-1.5"
          style={{ background: "var(--card)", border: "1px solid var(--border)" }}
        >
          <span className="text-xs" style={{ color: "var(--text)" }}>Total P/L:</span>
          <span className="font-num text-sm font-bold" style={{ color: totalPL >= 0 ? "var(--positive)" : "var(--negative)" }}>
            {totalPL >= 0 ? "+" : ""}${Math.abs(totalPL).toFixed(2)}
          </span>
        </div>
      </div>

      {/* Table */}
      <div className="card overflow-hidden">
        {loading ? (
          <div className="p-6 flex flex-col gap-3">
            {[...Array(6)].map((_, i) => <div key={i} className="skeleton h-[52px]" />)}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr style={{ borderBottom: "1px solid var(--border)" }}>
                  {["Symbol", "Side", "Lots", "Entry Price", "Current Price", "P/L (USD)", "Opened", "Status", ""].map((h) => (
                    <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider whitespace-nowrap" style={{ color: "var(--muted)" }}>
                      <div className="flex items-center gap-1">
                        {h}
                        {h && <ArrowUpDown size={10} style={{ opacity: 0.4 }} />}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="px-4 py-12 text-center text-sm" style={{ color: "var(--muted)" }}>
                      No positions found.
                    </td>
                  </tr>
                ) : filtered.map((pos) => (
                  <tr
                    key={pos.id}
                    className="transition-colors duration-150"
                    style={{ borderBottom: "1px solid var(--border)" }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "var(--card-hover)")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                  >
                    <td className="px-4 py-3.5">
                      <p className="text-[13px] font-bold m-0" style={{ color: "var(--text-bright)" }}>{pos.symbol}</p>
                    </td>
                    <td className="px-4 py-3.5">
                      <span
                        className="text-[11px] font-bold px-2.5 py-1 rounded-md"
                        style={{
                          background: pos.side === "Buy" ? "rgba(37,99,235,0.1)" : "rgba(220,38,38,0.1)",
                          color: pos.side === "Buy" ? "var(--accent)" : "var(--negative)",
                        }}
                      >
                        {pos.side}
                      </span>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className="font-num text-xs" style={{ color: "var(--text)" }}>{pos.lots}</span>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className="font-num text-xs" style={{ color: "var(--text)" }}>
                        {pos.entryPrice.toLocaleString("en-US", { maximumFractionDigits: 5 })}
                      </span>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className="font-num text-xs" style={{ color: "var(--text-bright)" }}>
                        {pos.currentPrice.toLocaleString("en-US", { maximumFractionDigits: 5 })}
                      </span>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className="font-num text-[13px] font-bold" style={{ color: pos.pl >= 0 ? "var(--positive)" : "var(--negative)" }}>
                        {pos.pl >= 0 ? "+" : ""}${Math.abs(pos.pl).toFixed(2)}
                      </span>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className="text-[11px]" style={{ color: "var(--muted)" }}>
                        {new Date(pos.openedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                      </span>
                    </td>
                    <td className="px-4 py-3.5">
                      <span
                        className="text-[11px] font-semibold px-2.5 py-1 rounded-full"
                        style={{
                          background: pos.status === "Open" ? "rgba(5,150,105,0.1)" : "var(--bg-secondary)",
                          color: pos.status === "Open" ? "var(--positive)" : "var(--muted)",
                        }}
                      >
                        {pos.status}
                      </span>
                    </td>
                    <td className="px-4 py-3.5">
                      {pos.status === "Open" && (
                        <button
                          type="button"
                          className="text-[11px] font-bold px-3 py-1 rounded-md border transition-opacity hover:opacity-70"
                          style={{
                            border: "1px solid rgba(220,38,38,0.35)",
                            background: "transparent",
                            color: "var(--negative)",
                          }}
                        >
                          Close
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
