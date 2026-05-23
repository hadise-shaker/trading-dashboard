import { cookies } from "next/headers";

import {
  generatePositions,
} from "@/lib/positions-generator";

export async function getRecentPositionsServer() {
  const cookieStore =
    await cookies();

  const user =
    cookieStore.get("user")?.value ??
    "guest";

  const positions =
    generatePositions(user);

  return positions.slice(0, 5);
}