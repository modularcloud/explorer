import * as React from "react";
import { Card } from "~/ui/card";
import { AreaChart } from "~/ui/area-chart";
import { cn } from "~/ui/shadcn/utils";
import { formatCurrencyToUSD } from "~/lib/utils";

interface Props {
  className?: string;
  mainColor: string;
  data: {
    x: string;
    y: number; // USD
  }[];
}

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
          valueFormatter={formatCurrencyToUSD}
          tooltipValueFormatter={(val) => `$` + val}
          data={props.data}
        />
      </div>
    </Card>
  );
}
