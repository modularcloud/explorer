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
    description: ``, // TODO
  };
}

export default function NetworkLogo({ params }: Props) {
  return <>Widget Network</>;
}
