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

const data = [
  {
    time: "Apr 08",
    new_price: 4000,
    price: 2400,
    amt: 2400,
  },
  {
    time: "Apr 15",
    new_price: 2000,
    price: 9800,
    amt: 2290,
  },
  {
    time: "Apr 20",
    new_price: 2780,
    price: 3908,
    amt: 2000,
  },
  {
    time: "Apr 24",
    new_price: 2390,
    price: 3800,
    amt: 2500,
  },
  {
    time: "Apr 29",
    new_price: 3490,
    price: 4300,
    amt: 2100,
  },
];

export const ExplorerLineChart = () => {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <LineChart data={data}>
        <XAxis
          dataKey="time"
          axisLine={false}
          tickLine={false}
          padding={{ left: 20 }}
        />
        <YAxis
          axisLine={false}
          // color="rgba(42, 43, 46, 0.4)"
          color="pink"
          tickLine={false}
          padding={{ bottom: 15 }}
          tickFormatter={(value) => `${Math.round(value / 1000)}`}
          unit="k"
        />
        <Tooltip />
        <Legend
          content={() => (
            <div className="mx-auto w-fit mb-6 text-center text-gray font-bold">
              Last 14 days transaction history
            </div>
          )}
          align="center"
          verticalAlign="top"
        />
        <Line
          type="monotone"
          dataKey="price"
          stroke="#B160FE"
          activeDot={{ r: 8 }}
        />
        <Line type="monotone" dataKey="new_price" stroke="#4A70FE" />
      </LineChart>
    </ResponsiveContainer>
  );
};
