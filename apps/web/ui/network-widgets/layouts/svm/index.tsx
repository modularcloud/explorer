import "server-only";
import * as React from "react";
import { BarChart, Disabled, Document, Folder } from "~/ui/icons";
import { IconCard } from "~/ui/network-widgets/widgets/icon-card";
import { LatestTransactions } from "~/ui/network-widgets/widgets/latest-transactions";
import { LatestBlocks } from "~/ui/network-widgets/widgets/latest-blocks";
import { SVMWidgetSkeleton } from "./skeleton";
import { Placeholder } from "~/ui/network-widgets/widgets/placeholder";

import { cn } from "~/ui/shadcn/utils";
import {
  getLatestBlocks,
  getLatestTransactions,
  getMetrics,
} from "./get-widget-data";

import type { SearchOption } from "~/lib/shared-utils";
import { SVMWidgetLayoutErrorBoundary } from "./error";
interface Props {
  network: SearchOption;
}

export function SVMWidgetLayout({ network }: Props) {
  if (!network) return null;
  return (
    <div
      style={{
        /**
         * Grid areas, each area corresponds to a widget and is abbreviated in a two chars name :
         * - LT : latest transactions
         * - LB : latest blocks
         * - CD : contracts deployed
         * - WA : wallet adresses
         * - TR : total transactions
         * - BK : total blocks
         * - P1, P2, P3 : placeholders (shown only on desktop)
         *
         * We define them as variables here because we use the same layout in the skeleton,
         * For more infos about how to use grid-template-areas see here :https://developer.mozilla.org/fr/docs/Web/CSS/grid-template-areas
         */
        // @ts-expect-error this is a CSS variable
        "--grid-area-mobile": `
            "LT LT"
            "LT LT"
            "WA TR"
            "LB LB"
            "LB LB"
            "CD BK"
          `,
        "--grid-area-tab": `
            "LT LT WA TR"
            "LT LT LB LB"
            "BK CD LB LB"
          `,
        "--grid-area-lg": `
            "LT LT WA LB LB"
            "LT LT BK LB LB"
            "CD P1 P2 P3 TR"
          `,
      }}
    >
      <SVMWidgetLayoutErrorBoundary>
        <React.Suspense fallback={<SVMWidgetSkeleton />}>
          <SVMWidgetLayoutContent network={network} />
        </React.Suspense>
      </SVMWidgetLayoutErrorBoundary>
    </div>
  );
}
export async function SVMWidgetLayoutContent({ network }: Props) {
  const [apiResult, latestBlocks, latestTransactions] = await Promise.all([
    getMetrics(network.id),
    getLatestBlocks(network.id),
    getLatestTransactions(network.id),
  ]);

  const {
    metrics: { CONTRACT, TRANSACTION, UNIQUE_ADDRESS },
    slotNumber,
  } = apiResult;

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
          "auto-rows-[160px] auto-cols-[145px]",
          "w-full gap-4 font-medium",
          "accent-primary place-items-stretch",
        )}
      >
        <LatestTransactions
          networkSlug={network.id}
          className="[grid-area:LT]"
          data={
            latestTransactions.body.type === "collection"
              ? latestTransactions.body.entries.map((transaction: any) => {
                  return {
                    hash: transaction.row.Transactions.payload.value,
                    success: transaction.row.Status.payload,
                    type: transaction.row.Type.payload,
                  };
                })
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

        <Placeholder className="hidden lg:block [grid-area:P1]" />
        <Placeholder className="hidden lg:block [grid-area:P2]" />
        <Placeholder className="hidden lg:block [grid-area:P3]" />

        <LatestBlocks
          networkSlug={network.id}
          className="[grid-area:LB]"
          data={
            latestBlocks.body.type === "collection"
              ? latestBlocks.body.entries.map((block: any) => {
                  return {
                    number: Number(block.row.Blocks.payload),
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
