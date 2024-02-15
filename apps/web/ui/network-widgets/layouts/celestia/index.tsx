import "server-only";
import * as React from "react";

import { CelestiaWidgetLayoutContent } from "./celestia-widget-content";

import { getCelestiaWidgetMetrics } from "./get-metrics";
import { getLatestBlocks, getLatestTransactions } from "~/lib/server-utils";

interface Props {
  networkSlug: string;
  networkBrandColor: string;
}

export async function CelestiaWidgetLayout({
  networkSlug,
  networkBrandColor,
}: Props) {
  const [metrics, latestBlocks, latestTransactions] = await Promise.all([
    getCelestiaWidgetMetrics(networkSlug),
    getLatestBlocks(networkSlug),
    getLatestTransactions(networkSlug),
  ]);

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
      <CelestiaWidgetLayoutContent
        networkSlug={networkSlug}
        networkBrandColor={networkBrandColor}
        initialLatestBlocks={latestBlocks}
        initialLatestTransactions={latestTransactions}
        initialMetrics={metrics}
        initialUpdatedAt={new Date()}
      />
    </div>
  );
}
