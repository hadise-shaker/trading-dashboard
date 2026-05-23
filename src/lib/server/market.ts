type MarketStats = {
	price: number;
	change: number;
};

type ChartPoint = {
	time: number;
	close: number;
};

export async function getMarketStatsServer(
	symbol: string,
): Promise<MarketStats> {
	const res = await fetch(
		`${process.env.NEXT_PUBLIC_BASE_URL}/api/market/price?symbol=${symbol}`,
		{
			cache: "no-store",
		},
	);

	if (!res.ok) {
		throw new Error("Failed to fetch market stats");
	}

	return res.json();
}

export async function getMarketChartServer(
	symbol: string,
	interval: string,
	limit: number,
): Promise<ChartPoint[]> {
	const res = await fetch(
		`${process.env.NEXT_PUBLIC_BASE_URL}/api/market/chart?symbol=${symbol}&interval=${interval}&limit=${limit}`,
		{
			cache: "no-store",
		},
	);

	if (!res.ok) {
		throw new Error("Failed to fetch chart data");
	}

	return res.json();
}
