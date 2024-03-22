import * as React from "react";

import { notFound } from "next/navigation";
import { getAllPaidNetworks, getSingleNetwork } from "~/lib/network";
import { capitalize } from "~/lib/shared-utils";

import type { Metadata } from "next";
import type { HeadlessRoute } from "~/lib/headless-utils";

import { SVMWidgetLayout } from "~/ui/network-widgets/layouts/svm";
import { CelestiaWidgetLayout } from "~/ui/network-widgets/layouts/celestia";
import { DymensionWidgetLayout } from "~/ui/network-widgets/layouts/dymension";
import { env } from "~/env.js";
import { OG_SIZE } from "~/lib/constants";

interface Props {
  params: Pick<HeadlessRoute, "network">;
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  console.log(
    `==================[generateMetadata (/${props.params.network})]==================`,
  );
  const network = await getSingleNetwork(props.params.network);
  console.dir(
    {
      network,
    },
    { depth: null },
  );
  if (!network) notFound();

  console.log({
    title: `${capitalize(network.brand)}`,
    description: `A block explorer for the ${capitalize(network.brand)} ecosystem.`,
    openGraph: {
      url: `/${network.slug}`,
      type: "website",
      images: [
        {
          url: `${env.NEXT_PUBLIC_PRODUCTION_URL}/api/og?model=network-home&networkSlug=${network.slug}`,
          ...OG_SIZE,
        },
      ],
    },
  });

  return {
    title: `${capitalize(network.brand)}`,
    description: `A block explorer for the ${capitalize(network.brand)} ecosystem.`,
    openGraph: {
      url: `/${network.slug}`,
      type: "website",
      images: [
        {
          url: `${env.NEXT_PUBLIC_PRODUCTION_URL}/api/og?model=network-home&networkSlug=${network.slug}`,
          ...OG_SIZE,
        },
      ],
    },
  };
}

export default async function NetworkWidgetPage({ params }: Props) {
  console.log(
    `==================[PAGE (/${params.network})]==================`,
  );
  const network = await getSingleNetwork(params.network);

  console.dir(
    {
      network,
    },
    { depth: null },
  );
  // this fixes a bug on vercel with build where it would throw if the network doesn't
  // exist (even though technically it should always exist)
  if (!network) notFound();

  console.dir(
    {
      layout: network.config.widgetLayout,
    },
    { depth: null },
  );
  switch (network.config.widgetLayout) {
    case "SVM":
      return (
        <SVMWidgetLayout
          networkSlug={network.slug}
          networkBrandColor={network.config.primaryColor}
        />
      );
    case "Celestia":
      return (
        <CelestiaWidgetLayout
          networkSlug={network.slug}
          networkBrandColor={network.config.primaryColor}
        />
      );
    case "Dymension":
      return <DymensionWidgetLayout />;
    default:
      return null;
  }
}

export async function generateStaticParams() {
  console.log(
    `==================[generateStaticParams (/[network])]==================`,
  );
  const paidNetworks = await getAllPaidNetworks();
  return paidNetworks.map((network) => ({ network: network.slug }));
}

export const revalidate = 10;
