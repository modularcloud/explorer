import { NetworkWidgets } from "~/ui/network-widgets";

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
    // description: ``, // TODO... should be returned by the API ?
  };
}

// TODO : see this for inspiration for widgets => https://nautscan.com/
// See this file for more ref : https://github.com/modularcloud/explorer/blob/0818NautilusMainnetStatsPage/apps/web/ui/stats/index.tsx
export default function NetworkWidgetPage({ params }: Props) {
  return <NetworkWidgets />;
}
