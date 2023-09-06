import * as React from "react";
import { Card } from "~/ui/card";
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
import { Select } from "~/ui/select";

import clsx from "clsx";

interface Props {
  className?: string;
}

export function TransactionHistory(props: Props) {
  const [currentTimeFrame, setCurrentTimeFrame] = React.useState("4");
  return (
    <Card className={clsx(props.className, "flex flex-col")} withoutPadding>
      <header className="flex items-center justify-between border-b border-mid-dark-100 p-3">
        <p>Transaction History</p>

        <Select
          value={currentTimeFrame}
          onChange={setCurrentTimeFrame}
          options={[
            {
              label: "Last 4 days",
              value: "4",
            },
            {
              label: "Last 14 days",
              value: "14",
            },
          ]}
        />
      </header>
    </Card>
  );
}

const chartdata = [
  {
    date: "Jan 22",
    SemiAnalysis: 2890,
    "The Pragmatic Engineer": 2338,
  },
  {
    date: "Feb 22",
    SemiAnalysis: 2756,
    "The Pragmatic Engineer": 2103,
  },
  {
    date: "Mar 22",
    SemiAnalysis: 3322,
    "The Pragmatic Engineer": 2194,
  },
  {
    date: "Apr 22",
    SemiAnalysis: 3470,
    "The Pragmatic Engineer": 2108,
  },
  {
    date: "May 22",
    SemiAnalysis: 3475,
    "The Pragmatic Engineer": 1812,
  },
  {
    date: "Jun 22",
    SemiAnalysis: 3129,
    "The Pragmatic Engineer": 1726,
  },
];

const dataFormatter = (number: number) => {
  return "$ " + Intl.NumberFormat("us").format(number).toString();
};
