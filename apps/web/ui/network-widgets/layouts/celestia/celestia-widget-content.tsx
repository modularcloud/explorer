"use client";
import * as React from "react";
import { Disabled, Folder, BarChart, Document } from "~/ui/icons";
import { IconCard } from "~/ui/network-widgets/widgets/icon-card";
import { LatestBlocks } from "~/ui/network-widgets/widgets/latest-blocks";
import { LatestTransactions } from "~/ui/network-widgets/widgets/latest-transactions";
import { Placeholder } from "~/ui/network-widgets/widgets/placeholder";

import { useCelestiaWidgetData } from "./use-widget-data";
import { cn } from "~/ui/shadcn/utils";

import type { CelestiaMetrics } from "./get-metrics";
import type { SearchOption } from "~/lib/shared-utils";
import type { Page } from "@modularcloud/headless";

interface Props {
  network: SearchOption;
  initialLatestTransactions: Page;
  initialLatestBlocks: Page;
  initialMetrics: CelestiaMetrics;
}

export function CelestiaWidgetLayoutContent({
  network,
  initialLatestBlocks,
  initialLatestTransactions,
  initialMetrics,
}: Props) {
  const { error, data } = useCelestiaWidgetData({
    networkSlug: network.id,
    initialMetrics,
    initialLatestBlocks,
    initialLatestTransactions,
  });

  const [lastUpdatedTime, setLastUpdatedTime] = React.useState<Date | null>(
    null,
  );

  React.useEffect(() => {
    if (data) {
      return setLastUpdatedTime(new Date());
    }
  }, [data]);

  if (error) {
    return <CelestiaWidgetSkeleton error={error} />;
  }

  if (!data) {
    return <CelestiaWidgetSkeleton />;
  }

  const [apiResult, latestBlocks, latestTransactions] = data;

  return (
    <div className="max-w-[1060px] mx-auto flex flex-col gap-4 w-full">
      {lastUpdatedTime && (
        <time
          className="hidden tab:block text-sm text-muted/40 mx-auto font-normal"
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
      <div
        style={{
          // @ts-expect-error this is a CSS variable
          "--color-primary": network.brandColor,
        }}
        className={cn(
          "grid grid-cols-2 tab:grid-cols-4 lg:grid-cols-5",
          "[grid-template-areas:var(--grid-area-mobile)]",
          "tab:[grid-template-areas:var(--grid-area-tab)]",
          "lg:[grid-template-areas:var(--grid-area-lg)]",
          "auto-rows-[153px] tab:auto-rows-[146.5px] auto-cols-[145px]",
          "w-full gap-8 tab:gap-10 font-medium max-w-full",
          "accent-primary",
        )}
      >
        <IconCard
          className="[grid-area:NS]"
          label="NAMESPACES"
          icon={Folder}
          value={apiResult.metrics.NAMESPACE.toLocaleString("en-US")}
        />

        <Placeholder className="hidden lg:block [grid-area:P1]" />
        <Placeholder className="hidden lg:block [grid-area:P2]" />

        <LatestTransactions
          networkSlug={network.id}
          className="[grid-area:LT]"
          data={
            latestTransactions.body.type === "collection"
              ? latestTransactions.body.entries.map((entry: any) => {
                  return {
                    hash: entry.row.Transactions.payload.value,
                    success: entry.row.Status.payload,
                    type: entry.row.Type.payload,
                  };
                })
              : []
          }
        />

        <IconCard
          className="[grid-area:BK]"
          label="TOTAL BLOCKS"
          icon={Disabled}
          value={parseInt(apiResult.blockHeight).toLocaleString("en-US")}
        />

        <IconCard
          className="[grid-area:BL]"
          label="TOTAL BLOBS"
          icon={Document}
          value={apiResult.metrics.BLOB.toLocaleString("en-US")}
        />

        <IconCard
          className="[grid-area:GP]"
          label="GAS PRICE"
          icon={Document}
          value={apiResult.metrics.LAST_10_BLOCKS_AVG_GAS_PRICE.toLocaleString(
            "en-US",
          )}
        />

        <IconCard
          label="TOTAL TRANSACTIONS"
          className="[grid-area:TR]"
          icon={BarChart}
          value={apiResult.metrics.TRANSACTION.toLocaleString("en-US")}
        />

        <LatestBlocks
          networkSlug={network.id}
          className="[grid-area:LB]"
          data={
            latestBlocks.body.type === "collection"
              ? latestBlocks.body.entries.map((block) => {
                  return {
                    number: Number(block.row.Height.payload),
                    noOfTransactions: Number(block.row.Txs.payload),
                    timestamp:
                      typeof block.sidebar.properties.Timestamp.payload ===
                      "string"
                        ? new Date(
                            block.sidebar.properties.Timestamp.payload,
                          ).getTime()
                        : new Date().getTime(),
                  };
                })
              : []
          }
        />
      </div>
    </div>
  );
}
function CelestiaWidgetSkeleton(props: { error?: { message: string } }) {
  return (
    <div
      className={cn(
        "w-full",
        "grid grid-cols-2 tab:grid-cols-4 lg:grid-cols-5",
        "[grid-template-areas:var(--grid-area-mobile)]",
        "tab:[grid-template-areas:var(--grid-area-tab)]",
        "lg:[grid-template-areas:var(--grid-area-lg)]",
        "auto-rows-[153px] tab:auto-rows-[146.5px] auto-cols-[145px]",
        "w-full gap-8 tab:gap-10 max-w-full relative",
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
      <Placeholder className="[grid-area:NS]" />
      <Placeholder className="[grid-area:BK]" />
      <Placeholder className="[grid-area:BL]" />
      <Placeholder className="[grid-area:GP]" />
      <Placeholder className="hidden lg:block [grid-area:P1]" />
      <Placeholder className="hidden lg:block [grid-area:P2]" />
    </div>
  );
}
