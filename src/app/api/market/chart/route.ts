
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const symbol = searchParams.get("symbol") || "BTCUSDT";
  const interval = searchParams.get("interval") || "1h";
  const limit = searchParams.get("limit") || "100";

  const res = await fetch(
    `https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=${interval}&limit=${limit}`
  );

  const data = await res.json();

  const formatted = data.map((k: any) => ({
    time: k[0],
    close: parseFloat(k[4]),
  }));

  return NextResponse.json(formatted);
}