import { LucideIcon } from "lucide-react";
import { TrendingUp, TrendingDown } from "lucide-react";
type Props = {
	title: string;
	value: number;
	change: number;
	isPercentage?: boolean;
	Icon: LucideIcon;
	iconBg: string;
	iconColor: string;
};

export default function KPICard({
	title,
	value,
	change,
	isPercentage = false,
	Icon,
	iconBg,
	iconColor,
}: Props) {
	const isPositive = change >= 0;
	const valueIsNegative = value < 0;

	const formattedValue = isPercentage
		? `${value >= 0 ? "+" : ""}${value.toFixed(2)}%`
		: `${valueIsNegative ? "-" : ""}$${Math.abs(value).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

	return (
		<div className="card animate-slide-up p-5 flex flex-col gap-3 shadow-md">
			<div className="flex items-start gap-3.5">
				<div
					className="w-13 h-13 rounded-full flex items-center justify-center shrink-0"
					style={{ background: iconBg }}
				>
					<Icon size={26} style={{ color: iconColor }} />
				</div>
				<div>
					<p className="text-sm font-semibold m-0 text-(--muted)">{title}</p>
					<p
						className="font-num text-[22px] font-bold mt-2.5 m-0 leading-none"
						style={{
							color: valueIsNegative ? "var(--negative)" : "var(--text-bright)",
						}}
					>
						{formattedValue}
					</p>
				</div>
			</div>
			<div className="flex items-center gap-1.5">
				{isPositive ? (
					<TrendingUp size={13} style={{ color: "var(--positive)" }} />
				) : (
					<TrendingDown size={13} style={{ color: "var(--negative)" }} />
				)}
				<span
					className="font-num text-xs font-semibold"
					style={{ color: isPositive ? "var(--positive)" : "var(--negative)" }}
				>
					{isPositive ? "+" : ""}
					{Math.abs(change)}%
				</span>
				<span className="text-xs" style={{ color: "var(--muted)" }}>
					from last week
				</span>
			</div>
		</div>
	);
}
