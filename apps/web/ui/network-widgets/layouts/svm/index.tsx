"use client";
import * as React from "react";
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
import { LatestTransactions } from "~/ui/network-widgets/widgets/latest-transactions";
import { LatestBlocks } from "~/ui/network-widgets/widgets/latest-blocks";

import { cn } from "~/ui/shadcn/utils";
import { convertWeiToBestUnit, convertWeiToUSD } from "~/lib/evm";
import { useWidgetData } from "./use-widget-data";

import type { SearchOption } from "~/lib/shared-utils";
interface Props {
  network: SearchOption;
}

// TODO : transform this into a client component
export function SVMWidgetLayout({ network }: Props) {
  console.log("network", network)
  // const { data: apiResult, isLoading, error } = useWidgetData(network.id);
  const apiResult = useWidgetData(network.id);
  // if (error) {
  //   return <EvmWithPriceSkeleton error={error.toString()} />;
  // }

  // if (!apiResult || isLoading) {
  //   return <EvmWithPriceSkeleton />;
  // }

  // if ("error" in apiResult) {
  //   return <EvmWithPriceSkeleton error={apiResult.error} />;
  // }

  const {
    data: {
      zbcPrice,
      gasPrice,
      blockMetrics,
      realTimeMetrics,
      transactionHistory,
      latestBlocks,
      latestTransactions,
    },
  } = apiResult;

  const currencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const subPennyCurrencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 4,
  });
  return (
    <div
      style={{
        // temporarily adding this here
        // @ts-expect-error this is a CSS variable
        "--color-primary": "236 15%, 18%" //network.brandColor,
      }}
      className={cn(
        "grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 auto-rows-[minmax(145px,_1fr)] auto-cols-[145px]",
        "w-full gap-4 font-medium",
        "accent-primary place-items-stretch",
      )}
    >
      <IconCard
        className="lg:row-start-1 lg:col-start-3"
        label="WALLET ADRESSES"
        icon={Folder}
        value={realTimeMetrics.walletAddresses.toLocaleString("en-US")}
      />

      <LatestTransactions
        networkSlug={network.id}
        className="col-span-2 row-span-2"
        data={latestTransactions}
      />

      <IconCard
        className="lg:row-start-2 lg:col-start-3"
        label="TOTAL BLOCKS"
        icon={Disabled}
        value={blockMetrics.latestBlock.toLocaleString("en-US")}
      />

      <IconCard
        className="lg:row-start-3 lg:col-start-1"
        label="CONTRACTS DEPLOYED"
        icon={Document}
        value={realTimeMetrics.contractsDeployed.toLocaleString("en-US")}
      />

      <IconCard
        label="TOTAL TRANSACTIONS"
        className="lg:row-start-3 lg:col-start-5 sm:col-start-4 sm:row-start-1 row-start-3 col-start-2"
        icon={BarChart}
        value={realTimeMetrics.totalTransactions.toLocaleString("en-US")}
      />

      <Placeholder className="lg:col-span-1 row-span-1 hidden lg:block lg:row-start-3" />
      <Placeholder className="lg:col-span-1 row-span-1 hidden lg:block lg:row-start-3" />
      <Placeholder className="lg:col-span-1 row-span-1 hidden lg:block lg:row-start-3" />

      <LatestBlocks
        networkSlug={network.id}
        className="col-span-2 row-span-2 order-first lg:row-start-1 lg:col-start-4"
        data={latestBlocks}
      />
    </div>
  );
}

function Placeholder(props: {
  className?: string;
  isLoading?: boolean;
  isError?: boolean;
}) {
  return (
    <div
      className={cn(props.className, "rounded-lg", {
        "animate-pulse": props.isLoading,
        "bg-muted-100": !props.isError,
        "bg-red-100": props.isError,
      })}
    />
  );
}

export function EvmWithPriceSkeleton(props: { error?: string }) {
  return (
    <div className="w-full grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5 auto-rows-[145px] auto-cols-[145px] relative">
      {props.error && (
        <div className="absolute inset-0 backdrop-blur-md rounded-lg text-center p-24 border border-red-400">
          <p className="text-red-400 text-lg">
            ⚠️ An Error Occured while loading the widgets :&nbsp;
            <strong className="font-medium">{props.error}</strong>
          </p>
        </div>
      )}

      <Placeholder
        className="col-span-2 row-span-2 order-first lg:row-start-1 lg:col-start-4"
        isLoading={!props.error}
        isError={!!props.error}
      />

      <Placeholder
        className="lg:row-start-1 lg:col-start-1"
        isLoading={!props.error}
        isError={!!props.error}
      />
      <Placeholder
        className="lg:row-start-1 lg:col-start-2"
        isLoading={!props.error}
        isError={!!props.error}
      />
      <Placeholder
        className="col-span-2 row-span-2 lg:row-start-2"
        isLoading={!props.error}
        isError={!!props.error}
      />

      <Placeholder
        className="lg:row-start-1 lg:col-start-3"
        isLoading={!props.error}
        isError={!!props.error}
      />

      <Placeholder
        className="col-span-1 row-span-1 hidden lg:block lg:row-start-2"
        isLoading={!props.error}
        isError={!!props.error}
      />

      <Placeholder
        className="lg:col-span-2 lg:row-start-3 lg:col-start-3"
        isLoading={!props.error}
        isError={!!props.error}
      />

      <Placeholder isLoading={!props.error} isError={!!props.error} />

      <Placeholder isLoading={!props.error} isError={!!props.error} />

      <Placeholder
        className="lg:col-span-2 row-span-1 hidden lg:block"
        isLoading={!props.error}
        isError={!!props.error}
      />
      <Placeholder
        className="col-span-1 row-span-1 hidden lg:block"
        isLoading={!props.error}
        isError={!!props.error}
      />

      <Placeholder isLoading={!props.error} isError={!!props.error} />
      <Placeholder isLoading={!props.error} isError={!!props.error} />
      <Placeholder
        className="col-span-2 row-span-2 md:row-start-4 lg:col-start-4"
        isLoading={!props.error}
        isError={!!props.error}
      />
    </div>
  );
}
