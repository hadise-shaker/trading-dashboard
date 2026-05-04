import Header from "@/components/dashboard/Header"
import KpiSection from "@/components/dashboard/KpiSection"
import MarketOverview from "@/components/dashboard/MarketOverview"
import RecentPositions from "@/components/dashboard/RecentPositions"

export default function DashboardPage() {
  return (
    <div className="p-6 bg-zinc-50 min-h-screen">
      
      <Header />
      <KpiSection />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <MarketOverview />
        <RecentPositions />
      </div>

    </div>
  )
}