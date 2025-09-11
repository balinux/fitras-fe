import { format } from "date-fns";
import {
  Tooltip,
  XAxis,
  ResponsiveContainer,
  CartesianGrid,
  YAxis,
  LineChart,
  Line,
} from "recharts";
import CustomTooltip from "./custom-tooltips";

type Props = {
  data: {
    date: string;
    income: number;
    expenses: number;
  }[];
};

export default function LineVariant({ data }: Props) {
  // reformat data, change expenses to positive
  const formattedData = data.map((item) => {
    return {
      ...item,
      expenses: Math.abs(item.expenses),
    };
  });
  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={formattedData}>
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
        <Line
          dot={false}
          strokeWidth={2}
          dataKey="income"
          stroke="#3d82f6"
          className="drop-shadow-sm"
        />
        <Line
          dot={false}
          strokeWidth={2}
          dataKey="expenses"
          stroke="#f43f5e"
          className="drop-shadow-sm"
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
