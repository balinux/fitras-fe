
import { format } from "date-fns";
import {
    Tooltip,
    XAxis,
    AreaChart,
    Area,
    ResponsiveContainer,
    CartesianGrid,
    YAxis
} from "recharts";
type Props = {
    data: {
        date: string;
        income: number;
        expenses: number;
    }[]
}

export default function AreaVariant({ data }: Props) {
    return (
        <ResponsiveContainer width="100%" height={350}>
            <AreaChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <defs>
                    <linearGradient id="income" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3d82f6" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#3d82f6" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="expenses" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#f43f5e" stopOpacity={0} />
                    </linearGradient>
                </defs>
                <XAxis
                    axisLine={false}
                    tickLine={false}
                    dataKey="date"
                    tickFormatter={(value) => format(value, "dd MM")}
                    style={{ fontSize: "12px" }}
                    tickMargin={16}
                />
                <YAxis tickLine={false}/>
                <Tooltip />
                <Area
                    type="monotone"
                    dataKey="income"
                    stackId="income"
                    stroke="#3d82f6"
                    strokeWidth={2}
                    fill="url(#income)"
                    className="drop-shadow-sm" />
                <Area
                    type="monotone"
                    dataKey="expenses"
                    stackId="expenses"
                    stroke="#f43f5e"
                    strokeWidth={2}
                    fill="url(#expenses)"
                    className="drop-shadow-sm" />
            </AreaChart>

        </ResponsiveContainer>
    )
}