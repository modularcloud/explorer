"use client";
import * as React from "react";
import { useParams } from "next/navigation";
import { Card } from "~/ui/card";
import { cn } from "~/ui/shadcn/utils";
import {
  BarChart,
  Clock,
  Disabled,
  Document,
  Folder,
  Gas,
  Globe,
  UsdCoin,
} from "~/ui/icons";
import { IconCard } from "~/ui/network-widgets/widgets/icon-card";
import { TransactionHistory } from "~/ui/network-widgets/widgets/transaction-history";
import {
  LatestTransactions,
  type TransactionRow,
} from "~/ui/network-widgets/widgets/latest-transactions";
import {
  LatestBlocks,
  type BlockRow,
} from "~/ui/network-widgets/widgets/latest-blocks";

interface Props {
  mainColor: string;
}

function EvmWithPriceSkeleton() {
  return (
    <div className="w-full grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5 auto-rows-[145px] auto-cols-[145px]">
      <Placeholder
        className="col-span-2 row-span-2 order-first lg:row-start-1 lg:col-start-4"
        isLoading
      />

      <Placeholder className="lg:row-start-1 lg:col-start-1" isLoading />
      <Placeholder className="lg:row-start-1 lg:col-start-2" isLoading />
      <Placeholder className="col-span-2 row-span-2 lg:row-start-2" isLoading />

      <Placeholder className="lg:row-start-1 lg:col-start-3" isLoading />

      <Placeholder
        className="col-span-1 row-span-1 hidden lg:block lg:row-start-2"
        isLoading
      />

      <Placeholder
        className="lg:col-span-2 lg:row-start-3 lg:col-start-3"
        isLoading
      />

      <Placeholder isLoading />

      <Placeholder isLoading />

      <Placeholder
        className="lg:col-span-2 row-span-1 hidden lg:block"
        isLoading
      />
      <Placeholder
        className="col-span-1 row-span-1 hidden lg:block"
        isLoading
      />

      <Placeholder isLoading />
      <Placeholder isLoading />
      <Placeholder
        className="col-span-2 row-span-2 md:row-start-4 lg:col-start-4"
        isLoading
      />
    </div>
  );
}

// TODO : remove this
const transactionHistoryDummyData = [
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

const transactionRows: TransactionRow[] = [
  {
    hash: "E9A41C60FA1DCBA5B9CE5434341dkeugfouyrgofihenrlflierherhu",
    success: true,
    type: "Get reward",
  },
  { hash: "E9A41C60FA1DCBA5B9CE5434342", success: false, type: "Pay for data" },
  { hash: "E9A41C60FA1DCBA5B9CE5434343", success: true, type: "Delegate" },
  { hash: "E9A41C60FA1DCBA5B9CE5434344", success: false, type: "Pay for data" },
  { hash: "E9A41C60FA1DCBA5B9CE5434345", success: true, type: "Get reward" },
];

const blockRows: BlockRow[] = [
  {
    number: 1851531,
    noOfTransactions: 50,
    timestamp: Date.now(),
  },
  {
    number: 1851532,
    noOfTransactions: 30,
    timestamp: Date.now(),
  },
  {
    number: 1851533,
    noOfTransactions: 40,
    timestamp: Date.now(),
  },
  {
    number: 1851534,
    noOfTransactions: 50,
    timestamp: Date.now(),
  },
  {
    number: 1851535,
    noOfTransactions: 50,
    timestamp: Date.now(),
  },
];

export function EvmWithPriceWidgetLayout({ mainColor }: Props) {
  const params = useParams();
  const network = params.network as string;

  return (
    <div
      style={{
        // @ts-expect-error this is a CSS variable
        "--color-primary": mainColor,
      }}
      className={cn(
        "grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 auto-rows-[minmax(145px,_1fr)] auto-cols-[145px]",
        "w-full gap-4 font-medium",
        "accent-primary place-items-stretch",
      )}
    >
      <TransactionHistory
        mainColor={mainColor}
        className="col-span-2 row-span-2 order-first lg:row-start-1 lg:col-start-4"
        data={transactionHistoryDummyData.map((datum) => ({
          x: datum.time,
          y: datum.volume,
        }))}
      />

      <IconCard
        className="lg:row-start-1 lg:col-start-1"
        label="WALLET ADRESSES"
        icon={Folder}
        value="160,275"
      />
      <IconCard
        className="lg:row-start-1 lg:col-start-2"
        label="Avg Block Time"
        icon={Clock}
        value="0.353 seconds"
      />
      <LatestTransactions
        className="col-span-2 row-span-2 lg:row-start-2"
        data={transactionRows}
      />

      <IconCard
        className="lg:row-start-1 lg:col-start-3"
        label="TOTAL BLOCKS"
        icon={Disabled}
        value="5,479,579"
      />

      <Placeholder className="col-span-1 row-span-1 hidden lg:block lg:row-start-2" />

      <IconCard
        className="lg:col-span-2 lg:row-start-3 lg:col-start-3"
        label="CONTRACTS DEPLOYED"
        icon={Document}
        value="225"
      />

      <IconCard label="TOTAL TRANSACTIONS" icon={BarChart} value="298,739" />

      <IconCard label="ZBC PRICE" icon={UsdCoin} value="$0.0118" />

      <Placeholder className="lg:col-span-2 row-span-1 hidden lg:block" />
      <Placeholder className="col-span-1 row-span-1 hidden lg:block" />

      <IconCard label="MARKET CAP" icon={Globe} value="$8,289,757.70" />
      <IconCard label="GAS PRICE" icon={Gas} value="30 Gwei ($3.55e-10)" />
      <LatestBlocks
        className="col-span-2 row-span-2 md:row-start-4 lg:col-start-4"
        data={blockRows}
      />
    </div>
  );
}

function Placeholder(props: { className?: string; isLoading?: boolean }) {
  return (
    <div
      className={cn(props.className, "bg-muted/20 rounded-lg", {
        "animate-pulse": props.isLoading,
      })}
    />
  );
}
