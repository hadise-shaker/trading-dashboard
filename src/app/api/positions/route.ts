import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { generatePositions } from "@/lib/positions-generator";

const positionsStore = new Map<string, ReturnType<typeof generatePositions>>();

export async function GET() {
  const cookieStore = await cookies();
  const user = cookieStore.get("user")?.value || "guest";

  if (!positionsStore.has(user)) {
    positionsStore.set(user, generatePositions(user));
  }

  return NextResponse.json(positionsStore.get(user));
}