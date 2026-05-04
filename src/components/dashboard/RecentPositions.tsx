import PositionsTable from "./PositionsTable"

export default function RecentPositions() {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm border border-zinc-200">
      
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-zinc-900">
          Recent Positions
        </h3>

        <button className="text-sm text-blue-600 hover:underline">
          View All
        </button>
      </div>

      <PositionsTable />
    </div>
  )
}