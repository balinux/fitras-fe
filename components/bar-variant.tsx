import { format } from "date-fns";
import {
  Tooltip,
  XAxis,
  AreaChart,
  Area,
  ResponsiveContainer,
  CartesianGrid,
  YAxis,
  BarChart,
  Bar,
} from "recharts";
import CustomTooltip from "./custom-tooltips";

type Props = {
  data: {
    date: string;
    income: number;
    expenses: number;
  }[];
};

export default function BarVariant({ data }: Props) {
  // reformat data, change expenses to positive
  const formattedData = data.map((item) => {
    return {
      ...item,
      expenses: Math.abs(item.expenses),
    };
  });
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={formattedData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          axisLine={false}
          tickLine={false}
          dataKey="date"
          tickFormatter={(value) => format(value, "dd MM")}
          style={{ fontSize: "12px" }}
          tickMargin={16}
        />
        <YAxis tickLine={false} />
        <Tooltip content={<CustomTooltip />} />
        <Bar dataKey="income" fill="#3d82f6" className="drop-shadow-sm" />
        <Bar dataKey="expenses" fill="#f43f5e" className="drop-shadow-sm" />
      </BarChart>
    </ResponsiveContainer>
  );
}
