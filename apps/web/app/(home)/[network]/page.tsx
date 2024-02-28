import * as React from "react";

import { notFound } from "next/navigation";
import { getAllPaidNetworks, getSingleNetwork } from "~/lib/network";
import { capitalize } from "~/lib/shared-utils";

import type { Metadata } from "next";
import type { HeadlessRoute } from "~/lib/headless-utils";
import type { SingleNetwork } from "~/lib/fetch-networks";

import { SVMWidgetLayout } from "~/ui/network-widgets/layouts/svm";
import { CelestiaWidgetLayout } from "~/ui/network-widgets/layouts/celestia";
import { DymensionWidgetLayout } from "~/ui/network-widgets/layouts/dymension";
import { env } from "~/env.mjs";
import { OG_SIZE } from "~/lib/constants";
import { ShortcutKey } from "~/ui/shortcut-key";
import { ScrollToSection } from "./scroll-to-section";
import { cn } from "~/ui/shadcn/utils";
import { FancyCheck } from "~/ui/icons";

interface Props {
  params: Pick<HeadlessRoute, "network">;
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const network = await getSingleNetwork(props.params.network);
  if (!network) notFound();

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
    icons: [
      {
        rel: "icon",
        url: `/api/og?model=favicon&networkSlug=${network.slug}`,
      },
    ],
  };
}

export default async function NetworkPage({ params }: Props) {
  const network = await getSingleNetwork(params.network);

  // this fixes a bug on vercel with build where it would throw if the network doesn't
  // exist (even though technically it should always exist)
  if (!network) notFound();

  return (
    <>
      <ScrollToSection />
      <HeroSection network={network} />
      <NetworkStatisticsSection network={network} />
    </>
  );
}

function HeroSection({ network }: { network: SingleNetwork }) {
  return (
    <section
      id="hero"
      className={cn(
        "flex flex-col items-center text-center border shadow-sm bg-white rounded-xl w-full",
        "relative mb-10",
        "tab:px-32 tab:py-14",
      )}
    >
      <small className="mb-4 uppercase text-xs border rounded-full px-3 py-1.5 bg-white tracking-[0.105rem]">
        {network.config.type}
      </small>
      <h1 className="mb-4 font-logo flex items-baseline gap-3 text-5xl font-medium md:text-6xl capitalize">
        <span
          className="text-transparent bg-clip-text"
          style={{
            backgroundImage: network.config.cssGradient,
          }}
        >
          {network.brand}
        </span>
        <span className="text-gray-900">{network.chainName}</span>
      </h1>

      <p className="text-sm text-muted mb-6">{network.config.description}</p>

      {/* Links */}
      <div></div>
      {/* Badges */}
      <div className="flex items-center justify-center w-full gap-3">
        {network.paidVersion && (
          <div className="flex items-center text-xs font-medium gap-1 border shadow-sm bg-white rounded-md px-3 py-1.5 text-muted">
            <span>Verified on</span>
            <FancyCheck className="h-4 w-4 text-blue-500" />
            <span>Modular Cloud</span>
          </div>
        )}
      </div>
    </section>
  );
}

function NetworkStatisticsSection({ network }: { network: SingleNetwork }) {
  let sectionContent: React.ReactNode;
  switch (network.config.widgetLayout) {
    case "SVM":
      sectionContent = (
        <SVMWidgetLayout
          networkSlug={network.slug}
          networkBrandColor={network.config.primaryColor}
        />
      );
      break;
    case "Celestia":
      sectionContent = (
        <CelestiaWidgetLayout
          networkSlug={network.slug}
          networkBrandColor={network.config.primaryColor}
        />
      );
      break;
    case "Dymension":
      sectionContent = <DymensionWidgetLayout />;
      break;
    default:
      sectionContent = null;
      break;
  }

  if (!sectionContent) return null;
  return (
    <section id="statistics" className="scroll-mt-10">
      <h2 className="flex items-center gap-3">
        <span className="text-xl">Statistics</span>
        <ShortcutKey command="S" className="text-sm px-2" />
      </h2>
      <div>{sectionContent}</div>
    </section>
  );
}

export async function generateStaticParams() {
  const paidNetworks = await getAllPaidNetworks();
  return paidNetworks.map((network) => ({ network: network.slug }));
}

export const revalidate = 10;
