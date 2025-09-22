/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Cell,
  Pie,
  PieChart,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import CategoryTooltip from "./category-tooltips";

const COLORS = ["#0062ff", "#12c6ff", "#ff647f", "#FF9354"];

type Props = {
  data: {
    name: string;
    value: number;
  }[];
};
export default function PieVariant({ data }: Props) {
  console.log("data: ", data);
  return (
    <ResponsiveContainer width="100%" height={350}>
      <PieChart>
        <Legend
          layout="horizontal"
          verticalAlign="bottom"
          align="right"
          iconType="circle"
          content={({ payload }: any) => {
            return (
              console.log("payload: ", payload),
            <ul className="flex flex-col space-x-2">
              {payload.map((entry: any, index: number) => (
                <li
                  key={`legend-${index}`}
                  className="flex items-center space-x-2"
                >
                  <span
                    className="size-2 rounded-full"
                    style={{ backgroundColor: entry.color }}
                  />
                  <div className="space-x-1">
                    <span className="text-sm text-muted-foreground">
                      {entry.value}
                    </span>
                    {/* <span className="text-sm">{entry.value}</span> */}
                  </div>
                </li>
              ))}
            </ul>
          )}}
        />
        <Tooltip content={<CategoryTooltip />} />
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={90}
          dataKey="value"
          paddingAngle={2}
          fill="#8884d8"
        >
          {data.map((_entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
}
