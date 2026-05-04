const data = [
    {
      symbol: "BTCUSD",
      entry: "66,245.10",
      current: "67,245.30",
      pl: 500.1,
      status: "Open",
    },
    {
      symbol: "EURUSD",
      entry: "1.08245",
      current: "1.08712",
      pl: 560.4,
      status: "Open",
    },
    {
      symbol: "XAUUSD",
      entry: "2345.60",
      current: "2310.25",
      pl: -106.05,
      status: "Open",
    },
  ]
  
  export default function PositionsTable() {
    return (
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          
          <thead className="text-left text-zinc-500 border-b border-zinc-200">
            <tr>
              <th className="py-2">Symbol</th>
              <th>Entry</th>
              <th>Current</th>
              <th>P/L</th>
              <th>Status</th>
            </tr>
          </thead>
  
          <tbody>
            {data.map((item, i) => (
              <tr
                key={i}
                className="border-b border-zinc-100 hover:bg-zinc-50 transition"
              >
                <td className="py-3 font-medium text-zinc-900">
                  {item.symbol}
                </td>
  
                <td className="text-zinc-600">{item.entry}</td>
                <td className="text-zinc-600">{item.current}</td>
  
                <td
                  className={`font-medium ${
                    item.pl > 0 ? "text-green-600" : "text-red-500"
                  }`}
                >
                  {item.pl > 0 ? "+" : ""}
                  {item.pl}
                </td>
  
                <td>
                  <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-600">
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
  
        </table>
      </div>
    )
  }