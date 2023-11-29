import "server-only";
import * as React from "react";
import { BarChart, Disabled, Document, Folder } from "~/ui/icons";
import { IconCard } from "~/ui/network-widgets/widgets/icon-card";
import { LatestTransactions } from "~/ui/network-widgets/widgets/latest-transactions";
import { LatestBlocks } from "~/ui/network-widgets/widgets/latest-blocks";
import { Placeholder } from "~/ui/network-widgets/widgets/placeholder";
import { CelestiaWidgetLayoutErrorBoundary } from "./error";
import { CelestiaWidgetSkeleton } from "./skeleton";

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
    <div
      style={{
        /**
         * Grid areas, each area corresponds to a widget and is abbreviated in a two chars name :
         * - LT : latest transactions
         * - LB: latest blocks
         * - BL : total blobs
         * - TR : total transactions
         * - BK : total blocks
         * - GP : gas price
         * - NS : namespaces
         * - P1, P2 : placeholders (shown only on desktop)
         *
         * We define them as variables here because we use the same layout in the skeleton,
         * For more infos about how to use grid-template-areas see here :https://developer.mozilla.org/fr/docs/Web/CSS/grid-template-areas
         */
        // @ts-expect-error this is a CSS variable
        "--grid-area-mobile": `
            "LT LT"
            "LT LT"
            "BL TR"
            "LB LB"
            "LB LB"
            "NS BK"
            "GP GP"
          `,
        "--grid-area-tab": `
            "LT LT BL BL"
            "LT LT LB LB"
            "NS GP LB LB"
            "BK BK TR TR"
          `,
        "--grid-area-lg": `
            "LT LT GP LB LB"
            "LT LT BK LB LB"
            "BL P1 NS P2 TR"
          `,
      }}
    >
      <CelestiaWidgetLayoutErrorBoundary>
        <React.Suspense fallback={<CelestiaWidgetSkeleton />}>
          <CelestiaWidgetLayoutContent network={network} />
        </React.Suspense>
      </CelestiaWidgetLayoutErrorBoundary>
    </div>
  );
}

async function CelestiaWidgetLayoutContent({ network }: Props) {
  const [apiResult, latestBlocks, latestTransactions] = await Promise.all([
    getMetrics(network.id),
    getLatestBlocks(network.id),
    getLatestTransactions(network.id),
  ]);

  return (
    <div className="max-w-[1060px] mx-auto flex flex-col gap-4 w-full">
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
