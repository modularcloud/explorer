"use client";
import {
  Label,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export type ExplorerLineChartProps = {
  data: {
    time: string;
    volume: number; // USD
  }[];
};
export const ExplorerLineChart = ({ data }: ExplorerLineChartProps) => {
  const daysFilter = data.length;
  return (
    <ResponsiveContainer width="100%" height={200}>
      <LineChart data={data}>
        <XAxis
          dataKey="time"
          axisLine={false}
          padding={{ left: 0 }}
          tickLine={false}
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          padding={{ bottom: 15 }}
          tickFormatter={(value) => `$${(value / 1000).toFixed(1)}`}
          unit="k"
        />
        <Tooltip />
        <Legend
          content={() => (
            <div className="mx-auto w-fit mb-6 text-center text-gray">
              {`Last ${daysFilter} day${
                daysFilter !== 1 ? "s" : ""
              } transaction histoy`}
            </div>
          )}
          align="center"
          verticalAlign="top"
        />
        <Line
          type="monotone"
          dataKey="volume"
          stroke="#B160FE"
          dot={false}
          activeDot={{ r: 2 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};
