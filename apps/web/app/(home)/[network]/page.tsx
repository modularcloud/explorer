import * as React from "react";

import {
  EvmWithPriceSkeleton,
  EvmWithPriceWidgetLayout,
} from "~/ui/network-widgets/layouts/evm-with-price";

import { notFound } from "next/navigation";
import { getSingleNetwork } from "~/lib/network";
import { capitalize } from "~/lib/utils";

import type { FetchLoadArgs } from "~/lib/utils";
import type { Metadata } from "next";

interface Props {
  params: Pick<FetchLoadArgs, "network">;
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const network = await getSingleNetwork(props.params.network);
  if (!network) notFound();

  return {
    title: `${capitalize(network.chainBrand)} - ModularCloud`,
    description: `A block explorer for the ${network.chainBrand} ecosystem.`,
  };
}

export default async function NetworkWidgetPage({ params }: Props) {
  const network = (await getSingleNetwork(params.network))!;

  switch (network.config.widgetLayout) {
    case "EvmWithPrice":
      return (
        // TODO don't await on the server and instead generate this page statically
        <React.Suspense fallback={<EvmWithPriceSkeleton />}>
          <EvmWithPriceWidgetLayout network={network} />
        </React.Suspense>
      );
    default:
      return null;
  }
}

export const fetchCache = "default-no-store";
