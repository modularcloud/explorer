import * as React from "react";
import {
  Label,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  AreaChart as RCAreaChart,
  CartesianGrid,
  Area,
  Tooltip,
} from "recharts";

interface Props {
  data: {
    time: string;
    volume: number; // USD
  }[];
  mainColor: string;
}

export function AreaChart({ mainColor, data }: Props) {
  return (
    <ResponsiveContainer width="100%" minHeight={200}>
      <RCAreaChart data={data}>
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor={`hsl(${mainColor})`}
              stopOpacity={0.35}
            />
            <stop
              offset="95%"
              stopColor={`hsl(${mainColor})`}
              stopOpacity={0}
            />
          </linearGradient>
        </defs>
        <CartesianGrid
          className="stroke-1"
          strokeDasharray="3 3"
          horizontal={true}
          vertical={false}
        />
        <XAxis
          dataKey="time"
          interval="preserveEnd"
          tickLine={false}
          axisLine={false}
          padding={{ left: 15, right: 10 }}
          minTickGap={5}
          tickCount={4}
          tick={{ transform: "translate(0, 6)" }}
        />
        <YAxis
          type="number"
          tick={{ transform: "translate(-3, 0)" }}
          axisLine={false}
          tickLine={false}
          tickFormatter={(value) => formatCurrency(value)}
          padding={{ top: 0, bottom: 0 }}
        />
        <Tooltip />
        <Area
          dot={false}
          type="monotone"
          dataKey="volume"
          strokeWidth={2}
          stroke={`hsl(${mainColor})`}
          fill="url(#colorUv)"
        />
      </RCAreaChart>
    </ResponsiveContainer>
  );
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumSignificantDigits: 3,
    currency: "USD",
    style: "currency",
  }).format(value);
}
