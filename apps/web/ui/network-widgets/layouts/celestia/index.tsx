import "server-only";
import * as React from "react";

import { CelestiaWidgetLayoutContent } from "./celestia-widget-content";

import { getCelestiaWidgetMetrics } from "./get-metrics";
import { getLatestBlocks, getLatestTransactions } from "~/lib/server-utils";

import type { SearchOption } from "~/lib/shared-utils";

interface Props {
  network: SearchOption;
}

export async function CelestiaWidgetLayout({ network }: Props) {
  // for some reason this is still necessary despite even https://github.com/modularcloud/explorer/pull/221/files#diff-c69978f5b3968360f90c0512cc7d7e2b73d184e4b4aa1b70dccaee69465000f2R33
  if (!network) return null;

  const [metrics, latestBlocks, latestTransactions] = await Promise.all([
    getCelestiaWidgetMetrics(network.id),
    getLatestBlocks(network.id),
    getLatestTransactions(network.id),
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
      <CelestiaWidgetLayoutContent
        network={network}
        initialLatestBlocks={latestBlocks}
        initialLatestTransactions={latestTransactions}
        initialMetrics={metrics}
      />
    </div>
  );
}
