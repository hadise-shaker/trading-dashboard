import { cookies } from "next/headers";
import DashboardHeader from "@/components/dashboard/header/DashboardHeader";
import PositionsClient from "@/components/dashboard/positions/PositionsClient";

export default async function PositionsPage() {
  const cookieStore = await cookies();
  const user = cookieStore.get("user")?.value || "Trader";
  const userName = user.split("@")[0];

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100%" }}>
      <DashboardHeader userName={userName} />
      <div style={{ padding: "24px" }}>
        <PositionsClient />
      </div>
    </div>
  );
}