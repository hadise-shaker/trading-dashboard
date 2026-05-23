export type Position = {
  id: string;
  symbol: string;
  side: "Buy" | "Sell";
  lots: number;
  entryPrice: number;
  currentPrice: number;
  pl: number;
  status: "Open" | "Closed";
  openedAt: string;
};

const BASE_POSITIONS: Omit<Position, "id" | "currentPrice" | "pl" | "openedAt">[] = [
  { symbol: "BTCUSD", side: "Buy",  lots: 0.50, entryPrice: 66245.10, status: "Open"   },
  { symbol: "EURUSD", side: "Buy",  lots: 1.20, entryPrice: 1.08245,  status: "Open"   },
  { symbol: "XAUUSD", side: "Sell", lots: 0.30, entryPrice: 2345.60,  status: "Open"   },
  { symbol: "GBPUSD", side: "Buy",  lots: 0.80, entryPrice: 1.26780,  status: "Closed" },
  { symbol: "USOIL",  side: "Buy",  lots: 1.00, entryPrice: 78.245,   status: "Closed" },
  { symbol: "ETHUSD", side: "Buy",  lots: 2.00, entryPrice: 3124.50,  status: "Open"   },
  { symbol: "USDJPY", side: "Sell", lots: 0.50, entryPrice: 154.320,  status: "Open"   },
  { symbol: "AUDUSD", side: "Buy",  lots: 1.50, entryPrice: 0.65120,  status: "Closed" },
  { symbol: "BNBUSD", side: "Buy",  lots: 3.00, entryPrice: 412.30,   status: "Closed" },
  { symbol: "SOLUSD", side: "Buy",  lots: 5.00, entryPrice: 148.20,   status: "Open"   },
];

const MS_PER_DAY = 86_400_000;

function randomMove(price: number, pct: number): number {
  return price * (1 + (Math.random() - 0.5) * pct * 2);
}

function calcPL(side: Position["side"], entry: number, current: number, lots: number): number {
  const priceDiff = side === "Buy" ? current - entry : entry - current;
  const multiplier = entry > 100 ? 1 : 10_000;
  return parseFloat((priceDiff * lots * multiplier).toFixed(2));
}

function hash(str: string): number {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (h << 5) - h + str.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}

export function generatePositions(userId: string): Position[] {
  const seed = hash(userId);

  return BASE_POSITIONS.map((p, i) => {
    const decimals    = p.entryPrice > 100 ? 2 : 5;
    const volatility  = 0.015 + (seed % 3) * 0.005;
    const currentPrice = parseFloat(randomMove(p.entryPrice, volatility).toFixed(decimals));
    const pl          = calcPL(p.side, p.entryPrice, currentPrice, p.lots);
    const daysAgo     = i * 3 + Math.floor(Math.random() * 3);
    const openedAt    = new Date(Date.now() - daysAgo * MS_PER_DAY).toISOString();

    return { ...p, id: String(i + 1), currentPrice, pl, openedAt };
  });
}