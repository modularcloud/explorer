import * as React from "react";

import { EvmWithPriceWidgetLayout } from "~/ui/network-widgets/layouts/evm-with-price";

import { notFound } from "next/navigation";
import { getAllNetworks, getSingleNetworkCached } from "~/lib/network";
import { capitalize } from "~/lib/shared-utils";
import { getSearchOptionGroups } from "~/lib/search-options";

import type { FetchLoadArgs } from "~/lib/shared-utils";
import type { Metadata } from "next";

interface Props {
  params: Pick<FetchLoadArgs, "network">;
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const network = await getSingleNetworkCached(props.params.network);
  if (!network) notFound();

  return {
    title: `${capitalize(network.chainBrand)}`,
    description: `A block explorer for the ${network.chainBrand} ecosystem.`,
  };
}

export default async function NetworkWidgetPage({ params }: Props) {
  const network = (await getSingleNetworkCached(params.network))!;

  const searchOptionGroups = await getSearchOptionGroups();
  const values = Object.values(searchOptionGroups).flat();
  const searchOption = values.find((network) => network.id === params.network);

  switch (network.config.widgetLayout) {
    case "EvmWithPrice":
      return <EvmWithPriceWidgetLayout network={searchOption!} />;
    default:
      return null;
  }
}

export async function generateStaticParams() {
  const allNetworks = await getAllNetworks();
  return allNetworks.map((network) => ({ network: network.slug }));
}
