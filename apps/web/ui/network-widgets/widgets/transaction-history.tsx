import * as React from "react";
import { Card } from "~/ui/card";

import { Select } from "~/ui/select";

import clsx from "clsx";
import { AreaChart } from "~/ui/area-chart";

interface Props {
  className?: string;
  mainColor: string;
}

const data = [
  {
    time: "Apr 08",
    volume: 4000,
  },
  {
    time: "Apr 15",
    volume: 2000,
  },
  {
    time: "Apr 20",
    volume: 27800,
  },
  {
    time: "Apr 24",
    volume: 23900,
  },
  {
    time: "Apr 29",
    volume: 34900,
  },
];

export function TransactionHistory(props: Props) {
  return (
    <Card className={clsx(props.className, "flex flex-col")} withoutPadding>
      <header className="flex items-center border-b border-mid-dark-100 p-3 justify-between">
        <p className="text-lg">Transaction History</p>
        <span className="text-muted font-normal">Last 14 Days</span>
      </header>
      <div className="p-4 h-full">
        <AreaChart mainColor={props.mainColor} data={data} />
      </div>
    </Card>
  );
}
