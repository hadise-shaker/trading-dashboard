"use client";

import { useEffect, useState } from "react";
import { TrendingUp, TrendingDown } from "lucide-react";

type Props = {
	symbol: string;
};

type Data = {
	price: number;
	change: number;
};

export default function MarketStats({ symbol }: Props) {
	const [data, setData] = useState<Data | null>(null);

	useEffect(() => {
		setData(null);

		fetch(`/api/market/price?symbol=${symbol}`)
			.then((r) => r.json())
			.then(setData);
	}, [symbol]);

	if (!data) {
		return (
			<div className="flex items-center justify-between">
				<div className="skeleton w-[120px] h-10" />
				<div className="skeleton w-20 h-10" />
			</div>
		);
	}

	const isPositive = data.change >= 0;

	return (
		<div className="flex items-center justify-between gap-4">
			<div className="min-w-0">
				<p className="text-base sm:text-lg font-bold text-foreground truncate">
					{symbol}
				</p>

				<p className="text-xs text-(--muted) mt-0.5">Market Overview</p>
			</div>

			<div className="text-right shrink-0">
				<p
					className="
            font-num
            text-lg sm:text-2xl
            font-bold
            text-foreground
          "
				>
					$
					{data.price.toLocaleString("en-US", {
						minimumFractionDigits: 2,
						maximumFractionDigits: 2,
					})}
				</p>

				<div className="flex items-center justify-end gap-1 mt-1">
					{isPositive ? (
						<TrendingUp size={13} className="text-[#00C896]" />
					) : (
						<TrendingDown size={13} className="text-[#E8293B]" />
					)}

					<span
						className={`
              font-num
              text-xs sm:text-sm
              font-semibold
              ${isPositive ? "text-[#00C896]" : "text-[#E8293B]"}
            `}
					>
						{isPositive ? "+" : ""}
						{data.change.toFixed(2)}%
					</span>
				</div>
			</div>
		</div>
	);
}
