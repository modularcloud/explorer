import * as React from "react";
import {
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Area,
  Tooltip,
  AreaChart as RCAreaChart,
} from "recharts";
import { Card } from "~/ui/card";
import { cn } from "~/ui/shadcn/utils";

interface Props {
  data: {
    x: string;
    y: number; // USD
  }[];
  mainColor: string;
  tooltipValueFormatter?: (tooltipValue: number) => string;
  valueFormatter?: (value: number) => string;
}

export function AreaChart({
  mainColor,
  data,
  tooltipValueFormatter,
  valueFormatter,
}: Props) {
  const [tooltipPosition, setTooltipPosition] = React.useState<{
    x: number;
    y: number;
  } | null>(null);
  const [tooltipValue, setTooltipValue] = React.useState<number | null>(null);

  // Keep all the dots values inside
  const dots = React.useRef<{ x: number; y: number }[]>([]);

  return (
    <ResponsiveContainer width="100%" minHeight={200}>
      <RCAreaChart
        data={data}
        onMouseMove={(e) => {
          if (dots.current.length > 0 && e.activeTooltipIndex !== undefined) {
            const currentDot = dots.current[e.activeTooltipIndex];

            if (currentDot) {
              const { x, y } = currentDot;
              if (tooltipPosition?.x !== x || tooltipPosition.y !== y) {
                setTooltipPosition({ x, y });
              }
              if (tooltipValue !== data[e.activeTooltipIndex].y) {
                setTooltipValue(data[e.activeTooltipIndex].y);
              }
            }
          }
        }}
        onMouseLeave={() => {
          setTooltipPosition(null);
          setTooltipValue(null);
        }}
      >
        <defs>
          <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
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
          dataKey="x"
          interval="preserveEnd"
          tickLine={false}
          axisLine={false}
          padding={{ left: 0, right: 0 }}
          minTickGap={5}
          tickCount={4}
          tick={{ transform: "translate(0, 6)" }}
        />
        <YAxis
          type="number"
          tick={{ transform: "translate(-3, 0)" }}
          axisLine={false}
          tickLine={false}
          tickFormatter={(value) =>
            valueFormatter ? valueFormatter(value) : value
          }
          padding={{ top: 0, bottom: 0 }}
        />
        <Tooltip<number, "y">
          cursor={false}
          isAnimationActive={false}
          offset={0}
          wrapperStyle={{ visibility: "visible" }}
          position={{ x: tooltipPosition?.x, y: tooltipPosition?.y }}
          content={(props) => {
            // payload correspond to one item value
            const payload = props.payload?.[0];
            if (!(payload && payload.value)) return null;

            return (
              <Card
                className={cn(
                  "p-2 relative bottom-14 right-10 shadow-md",
                  // these horribles styles are for the little arrow
                  // arrow outline
                  "after:absolute after:-bottom-1.5 after:rotate-180 after:left-1/2 after:-translate-x-1/2",
                  "after:h-1.5 after:w-2.5 after:bg-mid-dark-100",
                  "after:[clip-path:polygon(50%_0%,_0%_100%,_100%_100%)]",

                  // arrow bg
                  "before:z-10 before:absolute before:-bottom-1 before:rotate-180 before:left-1/2 before:-translate-x-1/2",
                  "before:h-1.5 before:w-2 before:bg-white",
                  "before:[clip-path:polygon(50%_0%,_0%_100%,_100%_100%)]",
                )}
              >
                {tooltipValueFormatter
                  ? tooltipValueFormatter(payload.value)
                  : payload.value}
              </Card>
            );
          }}
        />
        <Area
          activeDot={({ cx, cy, index }) => {
            dots.current[index] = { x: cx, y: cy };

            return (
              <circle
                cx={cx}
                cy={cy}
                r={4}
                stroke="white"
                strokeWidth={1.5}
                fill={`hsl(${mainColor})`}
              />
            );
          }}
          type="monotone"
          dataKey="y"
          strokeWidth={2}
          stroke={`hsl(${mainColor})`}
          fill="url(#gradient)"
        />
      </RCAreaChart>
    </ResponsiveContainer>
  );
}
