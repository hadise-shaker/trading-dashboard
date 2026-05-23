"use client";

import { useEffect, useRef } from "react";
import { createChart, AreaSeries, IChartApi, Time } from "lightweight-charts";
import { useTheme } from "@/context/ThemeContext";

type ChartPoint = { time: number; close: number };
type Props = { data: ChartPoint[] };

export default function MarketChart({ data }: Props) {
	const chartRef = useRef<HTMLDivElement>(null);
	const chartInst = useRef<IChartApi | null>(null);
	const seriesRef = useRef<ReturnType<IChartApi["addSeries"]> | null>(null);
	const { isDark } = useTheme();

	const colors = isDark
		? {
				grid: "#1E2230",
				border: "#1E2230",
				text: "#4A5168",
				line: "#3B82F6",
				cross: "#3B82F6",
			}
		: {
				grid: "#E4E7EF",
				border: "#E4E7EF",
				text: "#9AA0B2",
				line: "#2563EB",
				cross: "#2563EB",
			};

	useEffect(() => {
		if (!chartRef.current) return;

		const chart = createChart(chartRef.current, {
			height: 280,
			layout: {
				background: { color: "transparent" },
				textColor: colors.text,
			},
			grid: {
				vertLines: { color: colors.grid },
				horzLines: { color: colors.grid },
			},
			crosshair: {
				vertLine: { color: colors.cross, width: 1, style: 2 },
				horzLine: { color: colors.cross, width: 1, style: 2 },
			},
			rightPriceScale: { borderColor: colors.border },
			timeScale: { borderColor: colors.border, timeVisible: true },
		});

		const series = chart.addSeries(AreaSeries, {
			lineColor: colors.line,
			lineWidth: 2,
			topColor: isDark ? "rgba(59,130,246,0.45)" : "rgba(37,99,235,0.30)",
			bottomColor: isDark ? "rgba(59,130,246,0.05)" : "rgba(37,99,235,0.05)",
		} as Parameters<IChartApi["addSeries"]>[1]);

		chartInst.current = chart;
		seriesRef.current = series;
		if (data.length) {
			const formatted = data.map((d) => ({
				time: Math.floor(d.time / 1000) as Time,
				value: d.close,
			}));

			series.setData(formatted);

			chart.timeScale().fitContent();
		}
		const observer = new ResizeObserver(() => {
			if (chartRef.current) {
				chart.applyOptions({ width: chartRef.current.clientWidth });
			}
		});
		observer.observe(chartRef.current);

		return () => {
			observer.disconnect();
			chart.remove();
			chartInst.current = null;
			seriesRef.current = null;
		};
	}, [isDark]);

	useEffect(() => {
		if (!seriesRef.current || !data?.length) {
			return;
		}

		const formatted = data.map((d) => ({
			time: Math.floor(d.time / 1000) as Time,
			value: d.close,
		}));

		seriesRef.current.setData(formatted);

		chartInst.current?.timeScale().fitContent();
	}, [data]);

	return <div ref={chartRef} className="w-full" />;
}
