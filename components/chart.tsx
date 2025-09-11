import { AreaChart, BarChart, FileSearch, LineChart } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import AreaVariant from "@/components/area-variant";
import BarVariant from "./bar-variant";
import LineVariant from "./line-variant";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Skeleton } from "./ui/skeleton";

type Props = {
  data?: {
    date: string;
    income: number;
    expenses: number;
  }[];
};

export default function Chart({ data = [] }: Props) {
  const [variantType, setVariantType] = useState<string>("area");
  const onVariantTypeChange = (variant: string) => {
    setVariantType(variant);
  };

  return (
    <Card className="border-none drop-shadow-sm">
      <CardHeader className="flex space-y-2 lg:space-y-0 lg:flex-row lg:items-center justify-between">
        <CardTitle className="text-xl line-clamp-1">Transactions</CardTitle>
        <Select defaultValue={variantType} onValueChange={onVariantTypeChange}>
          <SelectTrigger className="lg:w-auto h-9 rounded-md px-3">
            <SelectValue placeholder="Select variant" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="area">
              <div className="flex items-center gap-x-2">
                <AreaChart className="size-4 mr-2 shrink-0" />
                <p className="line-clamp-1">Area</p>
              </div>
            </SelectItem>
            <SelectItem value="bar">
              <div className="flex items-center gap-x-2">
                <BarChart className="size-4 mr-2 shrink-0" />
                <p className="line-clamp-1">Bar</p>
              </div>
            </SelectItem>
            <SelectItem value="line">
              <div className="flex items-center gap-x-2">
                <LineChart className="size-4 mr-2 shrink-0" />
                <p className="line-clamp-1">Line</p>
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        {data.length === 0 ? (
          <div className="flex flex-col gap-y-4 item-center justify-center h-[350px] w-full">
            <FileSearch className="size-6 text-muted-foreground" />
            <p className="text-muted-foreground text-sm">
              No data for this period
            </p>
          </div>
        ) : (
          <>
            {variantType === "area" && <AreaVariant data={data} />}
            {variantType === "bar" && <BarVariant data={data} />}
            {variantType === "line" && <LineVariant data={data} />}
          </>
        )}
      </CardContent>
    </Card>
  );
}

export function ChartLoading() {
  return (
    <Card className="border-none drop-shadow-sm">
      <CardHeader className="flex space-y-2 lg:space-y-0 lg:flex-row lg:items-center justify-between">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-8 lg:w-[120px] w-full" />
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-y-4 item-center justify-center h-[350px] w-full">
          <Skeleton className="h-[350px] w-full" />
        </div>
      </CardContent>
    </Card>
  );
}
