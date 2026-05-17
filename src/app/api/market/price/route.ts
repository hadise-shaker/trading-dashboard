import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const symbol = searchParams.get("symbol") || "BTCUSDT";

  const res = await fetch(
    `https://api.binance.com/api/v3/ticker/24hr?symbol=${symbol}`
  );

  const data = await res.json();

  return NextResponse.json({
    price: parseFloat(data.lastPrice),
    change: parseFloat(data.priceChangePercent),
  });
}