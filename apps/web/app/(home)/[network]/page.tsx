import { EvmWithPriceWidgetLayout } from "~/ui/network-widgets/layouts/evm-with-price";

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

// TODO : see this for inspiration for widgets => https://nautscan.com/
// See this file for more ref : https://github.com/modularcloud/explorer/blob/0818NautilusMainnetStatsPage/apps/web/ui/stats/index.tsx
export default async function NetworkWidgetPage({ params }: Props) {
  const network = (await getSingleNetwork(params.network))!;

  switch (network.config.widgetLayout) {
    case "EvmWithPrice":
      return (
        <EvmWithPriceWidgetLayout mainColor={network.config.primaryColor} />
      );
    default:
      return null;
  }
}
