import KpiCard from "./KpiCard"

export default function KpiSection() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      
      <KpiCard title="Balance (USD)" value="$12,456.78" change="+2.45%" />
      <KpiCard title="Equity" value="$13,214.28" change="+1.32%" />
      <KpiCard title="Profit / Loss" value="$757.50" change="+5.71%" />
      <KpiCard title="Profit %" value="+6.12%" change="-0.45%" isPositive={false} />
    
    </div>
  )
}