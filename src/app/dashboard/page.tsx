import { cookies } from "next/headers";
import DashboardHeader from "@/components/dashboard/header/DashboardHeader";
import KPIContainer from "@/components/dashboard/kpi/KPIContainer";
import MarketOverview from "@/components/dashboard/market/MarketOverview";
import RecentPositions from "@/components/dashboard/RecentPositions";

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const user = cookieStore.get("user")?.value || "Trader";
  const userName = user.split("@")[0];

  return (
    <div className="flex flex-col min-h-full">
      <DashboardHeader userName={userName} />
      <div className="flex flex-col gap-5 p-6">
        <KPIContainer />
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          <MarketOverview />
          <RecentPositions />
        </div>
      </div>
    </div>
  );
}
