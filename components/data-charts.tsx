"use client";

import { useGetSummary } from "@/features/summary/api/use-get-summary";
import Chart from "@/components/chart";

export default function DataCharts() {
    const {data, isLoading} = useGetSummary();

    if (isLoading) {
        return (
            <div>
                <h1>Loading...</h1>
            </div>
        )
    }

    return (
        <div>
            <Chart data={data?.days}/>
        </div>
    )
}