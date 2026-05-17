"use client";
import { useEffect, useRef } from "react";
import { createChart, LineSeries, IChartApi } from "lightweight-charts";

type Props = { symbol: string; interval: string; limit: number };

export default function MarketChart({ symbol, interval, limit }: Props) {
  const chartRef  = useRef<HTMLDivElement>(null);
  const chartInst = useRef<IChartApi | null>(null);
  const seriesRef = useRef<ReturnType<IChartApi["addSeries"]> | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const chart = createChart(chartRef.current, {
      height: 280,
      layout: { background: { color: "transparent" }, textColor: "#4A5168" },
      grid:   { vertLines: { color: "#1E2230" }, horzLines: { color: "#1E2230" } },
      crosshair: { vertLine: { color: "#3B82F6", width: 1, style: 2 }, horzLine: { color: "#3B82F6", width: 1, style: 2 } },
      rightPriceScale: { borderColor: "#1E2230" },
      timeScale: { borderColor: "#1E2230", timeVisible: true },
    });

    const series = chart.addSeries(LineSeries, {
      color: "#3B82F6",
      lineWidth: 2,
    } as Parameters<IChartApi["addSeries"]>[1]);

    chartInst.current = chart;
    seriesRef.current = series;

    const observer = new ResizeObserver(() => {
      if (chartRef.current) chart.applyOptions({ width: chartRef.current.clientWidth });
    });
    observer.observe(chartRef.current);

    return () => { observer.disconnect(); chart.remove(); };
  }, []);

  useEffect(() => {
    if (!seriesRef.current) return;

    fetch(`/api/market/chart?symbol=${symbol}&interval=${interval}&limit=${limit}`)
      .then((r) => r.json())
      .then((data) => {
        const formatted = data.map((d: { time: number; close: number }) => ({
          time: Math.floor(d.time / 1000) as unknown as import("lightweight-charts").Time,
          value: d.close,
        }));
        seriesRef.current!.setData(formatted);
        chartInst.current?.timeScale().fitContent();
      });
  }, [symbol, interval, limit]);

  return <div ref={chartRef} className="w-full" />;
}