"use client";
import * as React from "react";
import { Disabled, Folder, BarChart, Document } from "~/ui/icons";
import { cn } from "~/ui/shadcn/utils";
import { IconCard } from "~/ui/network-widgets/widgets/icon-card";
import { LatestBlocks } from "~/ui/network-widgets/widgets/latest-blocks";
import { LatestTransactions } from "~/ui/network-widgets/widgets/latest-transactions";
import { Placeholder } from "~/ui/network-widgets/widgets/placeholder";
import { SvmMetrics } from "./get-metrics";

import { useSvmWidgetData } from "./use-widget-data";
import { useClientOnlyTime } from "~/ui/network-widgets/use-client-only-time";

import type { Page } from "@modularcloud/headless";

interface Props {
  networkSlug: string;
  networkBrandColor: string;
  initialLatestTransactions: Page;
  initialLatestBlocks: Page;
  initialMetrics: SvmMetrics;
  initialUpdatedAt: Date;
}

export function SVMWidgetLayoutContent({
  networkSlug,
  networkBrandColor,
  initialLatestBlocks,
  initialLatestTransactions,
  initialMetrics,
  initialUpdatedAt,
}: Props) {
  const { error, data } = useSvmWidgetData({
    networkSlug,
    initialLatestBlocks,
    initialLatestTransactions,
    initialMetrics,
  });

  const lastUpdatedTime = useClientOnlyTime(initialUpdatedAt, [data]);

  if (!data) {
    return (
      <SVMWidgetSkeleton
        error={
          error
            ? {
                message: error.toString(),
              }
            : undefined
        }
      />
    );
  }

  const [apiResult, latestBlocks, latestTransactions] = data;

  const {
    metrics: {
      CONTRACT,
      TRANSACTION,
      UNIQUE_ADDRESS,
      AVG_TRANSACTION_FEE_LAST_10_BLOCKS,
      TPS_LAST_10_BLOCKS,
    },
    slotNumber,
  } = apiResult;

  return (
    <div className="mx-auto grid gap-4 w-full">
      <div className="hidden tab:inline-block h-4 mx-auto text-center">
        {lastUpdatedTime && (
          <time
            className="text-xs text-muted/40 mx-auto font-normal"
            dateTime={lastUpdatedTime.toISOString()}
          >
            Last Updated:&nbsp;
            {new Intl.DateTimeFormat("en-US", {
              dateStyle: "long",
              timeStyle: "long",
              hour12: true,
              timeZone: "America/Los_Angeles",
            }).format(lastUpdatedTime)}
          </time>
        )}
      </div>
      <div
        style={{
          "--color-primary": networkBrandColor,
        }}
        className={cn(
          "grid grid-cols-2 tab:grid-cols-4 lg:grid-cols-5",
          "[grid-template-areas:var(--grid-area-mobile)]",
          "tab:[grid-template-areas:var(--grid-area-tab)]",
          "lg:[grid-template-areas:var(--grid-area-lg)]",
          "w-full gap-8 tab:gap-10 font-medium",
          "accent-primary place-items-stretch",
        )}
      >
        <LatestTransactions
          networkSlug={networkSlug}
          className="[grid-area:LT]"
          data={
            latestTransactions.body.type === "collection"
              ? latestTransactions.body.entries.map((transaction: any) => ({
                  hash: transaction.row.Transactions.payload.value,
                  success: transaction.row.Status.payload,
                  type: transaction.row.Type.payload,
                }))
              : []
          }
        />

        <IconCard
          className="[grid-area:WA]"
          label="WALLET ADRESSES"
          icon={Folder}
          value={UNIQUE_ADDRESS.toLocaleString("en-US")}
        />
        <IconCard
          className="[grid-area:BK]"
          label="TOTAL BLOCKS"
          icon={Disabled}
          value={parseInt(slotNumber).toLocaleString("en-US")}
        />

        <IconCard
          className="[grid-area:CD]"
          label="CONTRACTS DEPLOYED"
          icon={Document}
          value={CONTRACT.toLocaleString("en-US")}
        />

        <IconCard
          label="TOTAL TRANSACTIONS"
          className="[grid-area:TR]"
          icon={BarChart}
          value={TRANSACTION.toLocaleString("en-US")}
        />

        <IconCard
          label="TPS"
          className="[grid-area:TP]"
          icon={BarChart}
          value={TPS_LAST_10_BLOCKS.toLocaleString("en-US")}
        />

        <Placeholder className="hidden lg:block [grid-area:P1]" />

        <IconCard
          label="Average Fee"
          className="[grid-area:AF]"
          icon={Document}
          value={`${AVG_TRANSACTION_FEE_LAST_10_BLOCKS.toLocaleString(
            "en-US",
          )} Gwei`}
        />

        <LatestBlocks
          networkSlug={networkSlug}
          className="[grid-area:LB]"
          data={
            latestBlocks.body.type === "collection"
              ? latestBlocks.body.entries.map((block: any) => ({
                  number: Number(block.row.Blocks.payload),
                  noOfTransactions: Number(block.row.Txs.payload),
                  timestamp:
                    typeof block.sidebar.properties.Timestamp.payload ===
                    "string"
                      ? new Date(
                          block.sidebar.properties.Timestamp.payload,
                        ).getTime()
                      : new Date().getTime(),
                }))
              : []
          }
        />
      </div>
    </div>
  );
}

function SVMWidgetSkeleton(props: { error?: { message: string } }) {
  return (
    <div
      className={cn(
        "w-full",
        "grid grid-cols-2 tab:grid-cols-4 lg:grid-cols-5",
        "[grid-template-areas:var(--grid-area-mobile)]",
        "tab:[grid-template-areas:var(--grid-area-tab)]",
        "lg:[grid-template-areas:var(--grid-area-lg)]",
        "auto-rows-[160px] auto-cols-[145px]",
        "w-full gap-4 max-w-full relative",
      )}
    >
      {props.error && (
        <div className="absolute inset-0 backdrop-blur-md rounded-lg text-center p-24 border border-red-400">
          <p className="text-red-400 text-lg">
            ⚠️ An Error Occured while loading the widgets :&nbsp;
            <strong className="font-medium">{props.error?.message}</strong>
          </p>
        </div>
      )}

      <Placeholder className="[grid-area:LT]" />
      <Placeholder className="[grid-area:TR]" />
      <Placeholder className="[grid-area:LB]" />
      <Placeholder className="[grid-area:WA]" />
      <Placeholder className="[grid-area:CD]" />
      <Placeholder className="[grid-area:BK]" />
      <Placeholder className="hidden lg:block [grid-area:P1]" />
      <Placeholder className="hidden lg:block [grid-area:P2]" />
      <Placeholder className="hidden lg:block [grid-area:P3]" />
    </div>
  );
}
