"use client";

import { useEffect, useState, useRef } from "react";

import MarketChart from "./MarketChart";
import MarketStats from "./MarketStats";
import MarketControls from "./MarketControls";

type StatsData = {
	price: number;
	change: number;
};

type ChartPoint = {
	time: number;
	close: number;
};

type Props = {
	initialStats: StatsData;

	initialChartData: ChartPoint[];
};

export default function MarketOverview({
	initialStats,
	initialChartData,
}: Props) {
	const [symbol, setSymbol] = useState("BTCUSDT");

	const [interval, setInterval] = useState("1h");

	const [limit, setLimit] = useState(24);

	const [stats, setStats] = useState<StatsData>(
		initialStats ?? { price: 0, change: 0 },
	);
	const [chartData, setChartData] = useState<ChartPoint[]>(
		initialChartData ?? [],
	);

	const [loading, setLoading] = useState(false);

	const isFirstRender = useRef(true);

	useEffect(() => {
		// اولین render
		// دوباره fetch نکن
		if (isFirstRender.current) {
			isFirstRender.current = false;
			return;
		}

		let ignore = false;

		const loadMarketData = async () => {
			try {
				setLoading(true);

				const [statsRes, chartRes] = await Promise.all([
					fetch(`/api/market/price?symbol=${symbol}`, {
						cache: "no-store",
					}),

					fetch(
						`/api/market/chart?symbol=${symbol}&interval=${interval}&limit=${limit}`,
						{
							cache: "no-store",
						},
					),
				]);

				const statsData = await statsRes.json();

				const chart = await chartRes.json();

				if (ignore) return;

				setStats(statsData);

				setChartData(chart);
			} catch (err) {
				console.error(err);
			} finally {
				if (ignore) return;

				setLoading(false);
			}
		};

		loadMarketData();

		return () => {
			ignore = true;
		};
	}, [symbol, interval, limit]);

	return (
		<div className="card animate-slide-up delay-3 p-5 flex flex-col gap-4 shadow-md">
			<MarketControls
				symbol={symbol}
				setSymbol={setSymbol}
				interval={interval}
				setInterval={setInterval}
				limit={limit}
				setLimit={setLimit}
			/>

			<MarketStats symbol={symbol} data={stats} />

			<MarketChart data={chartData} />

			{loading && (
				<div className="text-xs text-(--muted)">Updating market data...</div>
			)}
		</div>
	);
}
