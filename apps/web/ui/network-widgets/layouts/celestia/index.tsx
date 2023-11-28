import "server-only";
import * as React from "react";
import { BarChart, Disabled, Document, Folder } from "~/ui/icons";
import { IconCard } from "~/ui/network-widgets/widgets/icon-card";
import { LatestTransactions } from "~/ui/network-widgets/widgets/latest-transactions";
import { LatestBlocks } from "~/ui/network-widgets/widgets/latest-blocks";
import { Placeholder } from "~/ui/network-widgets/widgets/placeholder";
import { CelestiaWidgetLayoutErrorBoundary } from "./error";

import { cn } from "~/ui/shadcn/utils";
import {
  getLatestBlocks,
  getLatestTransactions,
  getMetrics,
} from "./get-widget-data";

import type { SearchOption } from "~/lib/shared-utils";

interface Props {
  network: SearchOption;
}

export function CelestiaWidgetLayout({ network }: Props) {
  // for some reason this is still necessary despite even https://github.com/modularcloud/explorer/pull/221/files#diff-c69978f5b3968360f90c0512cc7d7e2b73d184e4b4aa1b70dccaee69465000f2R33
  if (!network) return null;
  return (
    <CelestiaWidgetLayoutErrorBoundary>
      <React.Suspense fallback={<CelestiaWidgetSkeleton />}>
        <CelestiaWidgetLayoutContent network={network} />
      </React.Suspense>
    </CelestiaWidgetLayoutErrorBoundary>
  );
}

async function CelestiaWidgetLayoutContent({ network }: Props) {
  const [apiResult, latestBlocks, latestTransactions] = await Promise.all([
    getMetrics(network.id),
    getLatestBlocks(network.id),
    getLatestTransactions(network.id),
  ]);

  return (
    <div className="max-w-[1060px] mx-auto flex flex-col gap-4">
      <time
        className="hidden tab:block text-sm text-muted/40 mx-auto font-normal"
        dateTime={new Date().toISOString()}
      >
        Last Updated:&nbsp;
        {new Intl.DateTimeFormat("en-US", {
          dateStyle: "full",
          timeStyle: "long",
          hour12: true,
          timeZone: "America/Los_Angeles",
        }).format(new Date())}
      </time>
      <div
        style={{
          // @ts-expect-error this is a CSS variable
          "--color-primary": network.brandColor,
        }}
        className={cn(
          "grid grid-cols-2 tab:grid-cols-4 lg:grid-cols-5",
          "w-full gap-8 tab:gap-10 font-medium",
          "accent-primary place-items-stretch",
        )}
      >
        <IconCard
          className="lg:col-span-1 row-span-1 lg:row-start-3 lg:col-start-3"
          label="NAMESPACES"
          icon={Folder}
          value={apiResult.metrics.NAMESPACE.toLocaleString("en-US")}
        />

        <Placeholder className="hidden lg:block lg:col-start-2" />

        <LatestTransactions
          networkSlug={network.id}
          className="col-span-2 row-span-2 row-start-1 col-start-1"
          data={
            latestTransactions.body.type === "collection"
              ? latestTransactions.body.entries.map((entry: any) => {
                  return {
                    hash: entry.row.Transactions.payload.value,
                    success: entry.row.Status.payload,
                    // temporary!!
                    type: entry.row.Type.payload,
                  };
                })
              : []
          }
        />

        <IconCard
          className="lg:row-start-2 lg:col-start-3 tab:col-start-1 tab:col-span-2 lg:col-span-1 tab:row-start-4"
          label="TOTAL BLOCKS"
          icon={Disabled}
          value={parseInt(apiResult.blockHeight).toLocaleString("en-US")}
        />

        <IconCard
          className="lg:row-start-3 lg:col-start-1 lg:col-span-1 tab:row-start-1 tab:col-span-2 tab:col-start-3 row-start-3 col-start-1"
          label="TOTAL BLOBS"
          icon={Document}
          value={apiResult.metrics.BLOB.toLocaleString("en-US")}
        />

        <IconCard
          className="lg:row-start-1 lg:col-start-3 col-span-2 tab:col-span-1"
          label="GAS PRICE"
          icon={Document}
          value={apiResult.metrics.LAST_10_BLOCKS_AVG_GAS_PRICE.toLocaleString(
            "en-US",
          )}
        />

        <Placeholder className="hidden lg:block lg:col-start-4" />

        <IconCard
          label="TOTAL TRANSACTIONS"
          className="lg:row-start-3 lg:col-start-5 lg:col-span-1 tab:col-start-3 tab:row-start-4 tab:col-span-2 row-start-3 col-start-2"
          icon={BarChart}
          value={apiResult.metrics.TRANSACTION.toLocaleString("en-US")}
        />

        <LatestBlocks
          networkSlug={network.id}
          className="col-span-2 row-span-2 order-first lg:row-start-1 lg:col-start-4"
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

export function CelestiaWidgetSkeleton() {
  return (
    <div className="w-full grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5 auto-rows-[145px] auto-cols-[145px] relative">
      <Placeholder className="lg:row-start-1 lg:col-start-3" />

      <Placeholder className="col-span-2 row-span-2" />

      <Placeholder className="lg:row-start-2 lg:col-start-3" />

      <Placeholder className="lg:row-start-3 lg:col-start-1" />

      <Placeholder className="lg:row-start-3 lg:col-start-5 sm:col-start-4 sm:row-start-1 row-start-3 col-start-2" />

      <Placeholder className="lg:col-span-1 row-span-1 hidden lg:block lg:row-start-3" />
      <Placeholder className="lg:col-span-1 row-span-1 hidden lg:block lg:row-start-3" />
      <Placeholder className="lg:col-span-1 row-span-1 hidden lg:block lg:row-start-3" />

      <Placeholder className="col-span-2 row-span-2 order-first lg:row-start-1 lg:col-start-4" />
    </div>
  );
}
