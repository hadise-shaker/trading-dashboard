import Link from "next/link";
import type { Position } from "@/lib/positions-generator";

type Props = {
	data: Position[];
};

export default function RecentPositions({ data }: Props) {
	return (
		<div className="card animate-slide-up delay-4 flex flex-col overflow-hidden shadow-md">
			{/* Header */}
			<div className="flex items-center justify-between px-5 py-4 border-b border-(--border)">
				<h2 className="text-sm font-semibold text-foreground m-0">
					Recent Positions
				</h2>

				<Link
					href="/dashboard/positions"
					className="text-xs font-semibold text-(--accent) no-underline"
				>
					View All →
				</Link>
			</div>

			{/* Table */}
			<div className="overflow-x-auto">
				<table className="w-full border-collapse">
					<thead>
						<tr className="border-b border-(--border)">
							{["Symbol", "Entry", "Current", "P/L", "Status"].map((h) => (
								<th
									key={h}
									className="px-4 py-2.5 text-left text-[11px] font-semibold text-(--muted) uppercase tracking-wider"
								>
									{h}
								</th>
							))}
						</tr>
					</thead>

					<tbody>
						{data.map((pos) => (
							<tr key={pos.id} className="border-b border-(--border)">
								{/* Symbol */}
								<td className="px-4 py-3">
									<p className="text-[13px] font-semibold text-foreground m-0">
										{pos.symbol}
									</p>

									<p
										className={`text-[11px] font-semibold m-0 mt-0.5 ${
											pos.side === "Buy"
												? "text-(--accent)"
												: "text-(--negative)"
										}`}
									>
										{pos.side} {pos.lots}
									</p>
								</td>

								{/* Entry */}
								<td className="px-4 py-3">
									<span className="font-num text-xs text-foreground">
										{pos.entryPrice.toLocaleString("en-US", {
											maximumFractionDigits: 5,
										})}
									</span>
								</td>

								{/* Current */}
								<td className="px-4 py-3">
									<span className="font-num text-xs text-foreground">
										{pos.currentPrice.toLocaleString("en-US", {
											maximumFractionDigits: 5,
										})}
									</span>
								</td>

								{/* P/L */}
								<td className="px-4 py-3">
									<span
										className={`font-num text-[13px] font-bold ${
											pos.pl >= 0 ? "text-(--positive)" : "text-(--negative)"
										}`}
									>
										{pos.pl >= 0 ? "+" : ""}${Math.abs(pos.pl).toFixed(2)}
									</span>
								</td>

								{/* Status */}
								<td className="px-4 py-3">
									<span
										className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${
											pos.status === "Open"
												? "bg-(--positive)/10 text-(--positive)"
												: "bg-(--border) text-(--muted)"
										}`}
									>
										{pos.status}
									</span>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}
