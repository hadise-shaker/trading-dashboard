import { DashboardStats } from "./mock-db";

function hash(str: string): number {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (h << 5) - h + str.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}

function randomChange(isPositive: boolean, min = 1, max = 5): number {
  const value = +(Math.random() * (max - min) + min).toFixed(2);
  return isPositive ? value : -value;
}

export function generateStats(userId: string): DashboardStats {
  const seed = hash(userId);

  const balance          = 10000 + (seed % 5000);
  const profitLoss       = (seed % 1200) - 600;
  const equity           = balance + profitLoss;
  const profitPercentage = +((profitLoss / balance) * 100).toFixed(2);

  return {
    balance,
    equity,
    profitLoss,
    profitPercentage,
    change: {
      balance:          +(Math.random() * 2).toFixed(2),
      equity:           randomChange(equity >= balance, 0.5, 2),
      profitLoss:       randomChange(profitLoss >= 0, 2, 6),
      profitPercentage: randomChange(profitPercentage >= 0, 1, 4),
    },
  };
}