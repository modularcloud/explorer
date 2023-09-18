"use client";
import * as React from "react";
import { Card } from "~/ui/card";
import { AreaChart } from "~/ui/area-chart";
import { cn } from "~/ui/shadcn/utils";

interface Props {
  className?: string;
  mainColor: string;
  data: {
    time: string;
    volume: number; // USD
  }[];
}

export function formatCurrencyToUSD(value: number) {
  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumSignificantDigits: 3,
    maximumFractionDigits: 2,
    currency: "USD",
    style: "currency",
  }).format(value);
}

const scaleValueFormatter = new Intl.NumberFormat("en-US", {
  notation: "compact",
  maximumSignificantDigits: 3,
  currency: "USD",
  style: "currency",
});

const tooltipValueFormatter = new Intl.NumberFormat("en-US", {
  maximumSignificantDigits: 6,
  maximumFractionDigits: 3,
  currency: "USD",
  style: "currency",
});

export function TransactionHistory(props: Props) {
  return (
    <Card className={cn("flex flex-col p-0", props.className)}>
      <header className="flex items-center border-b border-mid-dark-100 p-3 justify-between">
        <p className="text-lg">Transaction History</p>
        <span className="text-muted font-normal">Last 14 Days</span>
      </header>
      <div className="pr-4 py-4 h-full">
        <AreaChart
          mainColor={props.mainColor}
          valueFormatter={(val) => scaleValueFormatter.format(val)}
          tooltipValueFormatter={(val) => tooltipValueFormatter.format(val)}
          data={props.data.map((datum) => ({
            x: datum.time,
            y: datum.volume,
          }))}
        />
      </div>
    </Card>
  );
}
