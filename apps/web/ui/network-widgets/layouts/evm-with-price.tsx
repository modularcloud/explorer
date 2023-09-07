"use client";
import * as React from "react";
import { useParams } from "next/navigation";
import { Card } from "~/ui/card";
import { cn } from "~/ui/shadcn/utils";
import { TransactionHistory } from "~/ui/network-widgets/widgets/transaction-history";

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
        "grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 auto-rows-[145px] auto-cols-[145px]",
        "w-full gap-4 font-medium",
        "accent-primary",
      )}
    >
      <TransactionHistory
        mainColor={mainColor}
        className="col-span-2 row-span-2 order-first lg:row-start-1 lg:col-start-4"
      />

      <Card className="lg:row-start-1 lg:col-start-1">WALLET ADRESSES</Card>
      <Card className="lg:row-start-1 lg:col-start-2">AVG BLOCK TIME</Card>
      <Card className="col-span-2 row-span-2 lg:row-start-2">TRANSACTIONS</Card>

      <Card className="lg:row-start-1 lg:col-start-3">TOTAL BLOCKS</Card>

      <Placeholder className="col-span-1 row-span-1 hidden lg:block lg:row-start-2" />

      <Card className="lg:col-span-2 lg:row-start-3 lg:col-start-3">
        CONTRACTS DEPLOYED
      </Card>

      <Card>TOTAL TRANSACTIONS</Card>

      <Card>ZPC PRICE</Card>

      <Placeholder className="lg:col-span-2 row-span-1 hidden lg:block" />
      <Placeholder className="col-span-1 row-span-1 hidden lg:block" />

      <Card>MARKET CAP</Card>
      <Card>GAS PRICE</Card>
      <Card className="col-span-2 row-span-2 md:row-start-4 lg:col-start-4">
        LATEST BLOCKS
      </Card>
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
