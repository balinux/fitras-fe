"use client";

import { useGetSummary } from "@/features/summary/api/use-get-summary";
import Chart, { ChartLoading } from "@/components/chart";
import SpendingPie, { SpendingPieLoading } from "./spending-pie";

export default function DataCharts() {
  const { data, isLoading } = useGetSummary();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <ChartLoading />
        </div>
        <div className="lg:col-span-1">
          <SpendingPieLoading />
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <Chart data={data?.days} />
      </div>
      <div className="lg:col-span-1">
        <SpendingPie data={data?.categories} />
      </div>
    </div>
  );
}
