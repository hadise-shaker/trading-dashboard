import { cookies } from "next/headers";
import DashboardHeader from "@/components/dashboard/header/DashboardHeader";
import KPIContainer from "@/components/dashboard/kpi/KPIContainer";
import MarketOverview from "@/components/dashboard/market/MarketOverview";
import RecentPositions from "@/components/dashboard/RecentPositions";
import { getDashboardStatsServer } from "@/lib/server/dashboard";
import { getRecentPositionsServer } from "@/lib/server/positions";
import {
	getMarketStatsServer,
	getMarketChartServer,
} from "@/lib/server/market";

export default async function DashboardPage() {
	const cookieStore = await cookies();
	const user = cookieStore.get("user")?.value || "Trader";
	const userName = user.split("@")[0];
	const stats = await getDashboardStatsServer();
	const positions = await getRecentPositionsServer();
	const [marketStatsResult, chartDataResult] = await Promise.allSettled([
		getMarketStatsServer("BTCUSDT"),
		getMarketChartServer("BTCUSDT", "1h", 24),
	]);

	const marketStats =
		marketStatsResult.status === "fulfilled"
			? marketStatsResult.value
			: { price: 0, change: 0 };

	const chartData =
		chartDataResult.status === "fulfilled" ? chartDataResult.value : [];
	return (
		<div className="flex flex-col min-h-full">
			<DashboardHeader userName={userName} />

			<div className="flex flex-col gap-5 p-6">
				<KPIContainer data={stats} />

				<div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
					<MarketOverview
						initialStats={marketStats}
						initialChartData={chartData}
					/>

					<RecentPositions data={positions} />
				</div>
			</div>
		</div>
	);
}
