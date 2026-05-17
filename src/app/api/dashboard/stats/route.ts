import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { dashboardStore } from "@/lib/mock-db";
import { generateStats } from "@/lib/dashboard-generator";

export async function GET() {
  const cookieStore = await cookies();
  const user = cookieStore.get("user")?.value ?? "guest";

  if (!dashboardStore.has(user)) {
    dashboardStore.set(user, generateStats(user));
  }

  const data = dashboardStore.get(user)!;

  return NextResponse.json(data);
}