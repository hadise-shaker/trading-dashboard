"use client";

import KPICard from "./KPICard";
import { kpiConfig } from "./kpi-config";

import type { DashboardStats } from "@/lib/mock-db";

type Props = {
	data: DashboardStats;
};

type KPIKey = keyof typeof kpiConfig;

const KPI_KEYS: KPIKey[] = [
	"balance",
	"equity",
	"profitLoss",
	"profitPercentage",
];

export default function KPIContainer({ data }: Props) {
	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
			{KPI_KEYS.map((key) => {
				const config = kpiConfig[key];

				return (
					<KPICard
						key={key}
						title={config.title}
						value={data[key]}
						change={data.change[key]}
						Icon={config.icon}
						iconBg={config.iconBg}
						iconColor={config.iconColor}
						isPercentage={key === "profitPercentage"}
					/>
				);
			})}
		</div>
	);
}
