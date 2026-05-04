type KpiCardProps = {
    title: string
    value: string
    change?: string
    isPositive?: boolean
  }
  
  export default function KpiCard({
    title,
    value,
    change,
    isPositive = true,
  }: KpiCardProps) {
    return (
      <div className="rounded-2xl bg-white p-5 shadow-sm border border-zinc-200 hover:shadow-md transition">
        
        <p className="text-sm text-zinc-500">{title}</p>
  
        <h2 className="text-2xl font-semibold mt-2 text-zinc-900">
          {value}
        </h2>
  
        {change && (
          <p
            className={`text-sm mt-2 font-medium ${
              isPositive ? "text-green-600" : "text-red-500"
            }`}
          >
            {change}
          </p>
        )}
      </div>
    )
  }