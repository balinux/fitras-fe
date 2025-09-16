import { Suspense } from "react";
import DataCharts from "@/components/data-charts";
import DataGrid from "@/components/data-grid";
import { DataCardLoading } from "@/components/data-card";
import { ChartLoading } from "@/components/chart";
import { SpendingPieLoading } from "@/components/spending-pie";

export default function Home() {
  return (
    <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
      <Suspense fallback={<DataGridLoading />}>
        <DataGrid />
      </Suspense>
      <Suspense fallback={<DataChartsLoading />}>
        <DataCharts />
      </Suspense>
    </div>
  );
}

const DataGridLoading = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-2 mb-8">
      <DataCardLoading />
      <DataCardLoading />
      <DataCardLoading />
    </div>
  );
};

const DataChartsLoading = () => {
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
};
