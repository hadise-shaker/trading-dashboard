import { Wallet, PieChart, TrendingUp, Percent } from "lucide-react";

export const kpiConfig = {
  balance: {
    title: "Balance (USD)",
    icon: Wallet,
    iconBg: "rgba(59,130,246,0.12)",
    iconColor: "#3B82F6",
  },
  equity: {
    title: "Equity (USD)",
    icon: PieChart,
    iconBg: "rgba(139,92,246,0.12)",
    iconColor: "#8B5CF6",
  },
  profitLoss: {
    title: "Profit / Loss (USD)",
    icon: TrendingUp,
    iconBg: "rgba(0,200,150,0.12)",
    iconColor: "#00C896",
  },
  profitPercentage: {
    title: "Profit Percentage",
    icon: Percent,
    iconBg: "rgba(245,158,11,0.12)",
    iconColor: "#F59E0B",
  },
};