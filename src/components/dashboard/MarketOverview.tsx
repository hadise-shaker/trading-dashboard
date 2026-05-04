import ChartToolbar from "./ChartToolbar"

export default function MarketOverview() {
  return (
    <div className="lg:col-span-2 rounded-2xl bg-white p-6 shadow-sm border border-zinc-200">
      
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-zinc-900">
          Market Overview
        </h3>

        <select className="text-sm border border-zinc-200 rounded-lg px-2 py-1 bg-white">
          <option>BTCUSD</option>
          <option>EURUSD</option>
        </select>
      </div>

      <ChartToolbar />

      <div className="h-[300px] rounded-xl bg-zinc-100 flex items-center justify-center text-zinc-400">
        Trading Chart
      </div>
    </div>
  )
}