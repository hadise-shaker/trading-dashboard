"use client";

import { useState } from "react";
import MarketChart from "./MarketChart";
import MarketStats from "./MarketStats";
import MarketControls from "./MarketControls";

export default function MarketOverview() {
	const [symbol, setSymbol] = useState("BTCUSDT");
	const [interval, setInterval] = useState("1h");
	const [limit, setLimit] = useState(24);

	return (
    <div className="card animate-slide-up delay-3 p-5 flex flex-col gap-4">
			<MarketControls
				symbol={symbol}
				setSymbol={setSymbol}
				interval={interval}
				setInterval={setInterval}
				limit={limit}
				setLimit={setLimit}
			/>
			<MarketStats symbol={symbol} />
			<MarketChart symbol={symbol} interval={interval} limit={limit} />
		</div>
	);
}
