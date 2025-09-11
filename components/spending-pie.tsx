import {  FileSearch, PieChart, Radar, Target} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import PieVariant from "@/components/pie-variant";
import RadarVariant from "./radar-variant";
import RadialVariant from "./radial-variant";
import { Skeleton } from "./ui/skeleton";

type Props = {
    data?: {
        name: string,
        value: number,
    }[];
};

export default function SpendingPie({ data = [] }: Props) {
    const [variantType, setVariantType] = useState<string>("pie");
    const onVariantTypeChange = (variant: string) => {
        setVariantType(variant);
    };

    return (
        <Card className="border-none drop-shadow-sm">
            <CardHeader className="flex space-y-2 lg:space-y-0 lg:flex-row lg:items-center justify-between">
                <CardTitle className="text-xl line-clamp-1">
                    Categories
                </CardTitle>
                <Select
                    defaultValue={variantType}
                    onValueChange={onVariantTypeChange}>
                    <SelectTrigger className="lg:w-auto h-9 rounded-md px-3">
                        <SelectValue placeholder="Select variant" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="pie">
                            <div className="flex items-center gap-x-2">
                                <PieChart className="size-4 mr-2 shrink-0" />
                                <p className="line-clamp-1">Pie Chart</p>
                            </div>
                        </SelectItem>
                        <SelectItem value="radar">
                            <div className="flex items-center gap-x-2">
                                <Radar className="size-4 mr-2 shrink-0" />
                                <p className="line-clamp-1">Radar Chart</p>
                            </div>
                        </SelectItem>
                        <SelectItem value="radial">
                            <div className="flex items-center gap-x-2">
                                <Target className="size-4 mr-2 shrink-0" />
                                <p className="line-clamp-1">Radial Chart</p>
                            </div>
                        </SelectItem>
                    </SelectContent>
                </Select>
            </CardHeader>
            <CardContent>
                {data.length === 0 ? (
                    <div className="flex flex-col gap-y-4 item-center justify-center h-[350px] w-full">
                        <FileSearch className="size-6 text-muted-foreground" />
                        <p className="text-muted-foreground text-sm">No data for this period</p>
                    </div>
                ) : (
                    <>
                        {variantType === "pie" && <PieVariant data={data} />}
                        {variantType === "radar" && <RadarVariant data={data} />}
                        {variantType === "radial" && <RadialVariant data={data} />}
                    </>
                )}
            </CardContent>
        </Card>
    )
}

export function SpendingPieLoading() {
    return (
        <Card className="border-none drop-shadow-sm">
            <CardHeader className="flex space-y-2 lg:space-y-0 lg:flex-row lg:items-center justify-between">
                <Skeleton className="h-8 w-48" />
                <Skeleton className="h-8 lg:w-[120px] w-full" />
            </CardHeader>
            <CardContent>
                <div className="flex flex-col gap-y-4 item-center justify-center h-[350px] w-full">
                    <Skeleton className="h-[350px] w-full" />
                    <Skeleton className="h-8 w-48" />
                </div>
            </CardContent>
        </Card>
    )
}