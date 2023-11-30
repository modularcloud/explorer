import "server-only";
import * as React from "react";
import { SVMWidgetLayoutContent } from "./svm-widget-content";

import { getSvmWidgetMetrics } from "./get-metrics";
import { getLatestBlocks, getLatestTransactions } from "~/lib/server-utils";

import type { SearchOption } from "~/lib/shared-utils";
interface Props {
  network: SearchOption;
}

export async function SVMWidgetLayout({ network }: Props) {
  if (!network) return null;

  const [metrics, latestBlocks, latestTransactions] = await Promise.all([
    getSvmWidgetMetrics(network.id),
    getLatestBlocks(network.id),
    getLatestTransactions(network.id),
  ]);

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
      <SVMWidgetLayoutContent
        network={network}
        initialLatestBlocks={latestBlocks}
        initialLatestTransactions={latestTransactions}
        initialMetrics={metrics}
      />
    </div>
  );
}
