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
import { TransactionVolume } from "../stats";

const data = [
  {
    time: "Apr 08",
    new_price: 4000,
    // price: 2400,
    amt: 2400,
  },
  {
    time: "Apr 15",
    new_price: 2000,
    // price: 9800,
    amt: 2290,
  },
  {
    time: "Apr 20",
    new_price: 27800,
    // price: 39080,
    amt: 2000,
  },
  {
    time: "Apr 24",
    new_price: 23900,
    // price: 38000,
    amt: 2500,
  },
  {
    time: "Apr 29",
    new_price: 34900,
    // price: 43000,
    amt: 2100,
  },
];

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
            <div className="text-gray mx-auto mb-6 w-fit text-center">
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
