import type { DashboardStats } from "@/lib/mock-db";

export async function getDashboardStats(): Promise<DashboardStats> {
  const res = await fetch("/api/dashboard/stats", { cache: "no-store" });

  if (!res.ok) {
    throw new Error(`Failed to fetch dashboard stats: ${res.status}`);
  }

  const data = await res.json() as DashboardStats;
  return data;
}