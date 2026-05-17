"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { SYMBOLS, TIMEFRAMES } from "@/constants/market";

type Props = {
	symbol: string;
	setSymbol: (s: string) => void;
	interval: string;
	setInterval: (i: string) => void;
	limit: number;
	setLimit: (n: number) => void;
};

export default function MarketControls({
	symbol,
	setSymbol,
	interval,
	setInterval,
	limit,
	setLimit,
}: Props) {
	const [showMenu, setShowMenu] = useState(false);

	return (
		<div className="flex items-center justify-between gap-3 flex-wrap">
			{/* Symbol picker */}
			<div className="relative">
				<button
					onClick={() => setShowMenu((p) => !p)}
					className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[13px] font-semibold transition-colors border border-(--border) text-foreground"
				>
					{symbol}
					<ChevronDown size={13} className="text-(--muted)" />
				</button>
				{showMenu && (
					<div className="absolute top-[calc(100%+4px)] left-0 rounded-xl overflow-hidden z-20 min-w-[140px] bg-(--card) border border-(--border) shadow-lg">
						{SYMBOLS.map((s) => (
							<button
								key={s}
								onClick={() => {
									setSymbol(s);
									setShowMenu(false);
								}}
								className={`
                  block w-full
                  text-left
                  px-4 py-2.5
                  text-[13px]
                  font-medium
                  border-none
                  bg-transparent
                  transition-colors
                  hover:opacity-80
                  ${s === symbol ? "text-(--accent)" : "text-foreground"}
                `}
							>
								{s}
							</button>
						))}
					</div>
				)}
			</div>

			{/* Timeframes */}
			<div
				className="flex gap-0.5 rounded-lg p-[3px]"
				style={{ background: "var(--bg)" }}
			>
				{TIMEFRAMES.map((t) => {
					const active = interval === t.value && limit === t.limit;
					return (
            <button
              key={t.label}
              onClick={() => {
                setInterval(t.value);
                setLimit(t.limit);
              }}
              className={`
                px-2.5 py-1.5
                rounded-md
                text-xs
                font-semibold
                border-none
                transition-all
                duration-150
                ${
                  active
                    ? `
                      bg-(--card)
                      text-foreground
                      shadow-(--shadow)
                    `
                    : `
                      bg-transparent
                      text-(--muted)
                    `
                }
              `}
            >
							{t.label}
						</button>
					);
				})}
			</div>
		</div>
	);
}
