import { cookies } from "next/headers";

import { dashboardStore } from "@/lib/mock-db";
import { generateStats } from "@/lib/dashboard-generator";

export async function getDashboardStatsServer() {
	const cookieStore = await cookies();

	const user = cookieStore.get("user")?.value ?? "guest";

	if (!dashboardStore.has(user)) {
		dashboardStore.set(user, generateStats(user));
	}

	return dashboardStore.get(user)!;
}
