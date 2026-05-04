export default function ChartToolbar() {
    const ranges = ["1D", "1W", "1M", "3M", "1Y"]
  
    return (
      <div className="flex gap-2 mb-4 text-sm">
        {ranges.map((item) => (
          <button
            key={item}
            className="px-3 py-1 rounded-lg bg-zinc-100 hover:bg-zinc-200 transition"
          >
            {item}
          </button>
        ))}
      </div>
    )
  }