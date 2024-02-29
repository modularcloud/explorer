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
import {
  DiscordLogo,
  FancyCheck,
  GithubLogo,
  TiltedGlobe,
  XLogo,
} from "~/ui/icons";
import { TokenPrices } from "~/ui/token-prices";
import Image from "next/image";
import { Badge } from "~/ui/badge";

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
      <NetworkSections network={network} />
    </>
  );
}

function getLogoSVGSrc(network: SingleNetwork) {
  switch (network.brand) {
    case "celestia":
      return "/images/celestia-logo-white.svg";
    case "dymension":
      return "/images/dymension-logo-white.svg";
    case "eclipse":
      return "/images/eclipse-logo-white.svg";
    default:
      if (network.config.platform === "dymension") {
        return "/images/dymension-logo-white.svg";
      }
      return network.config.logoUrl;
  }
}

function HeroSection({ network }: { network: SingleNetwork }) {
  const links = network.config.links;
  return (
    <section
      id="hero"
      className={cn(
        "flex flex-col items-center text-center border shadow-sm bg-white rounded-xl w-full",
        "relative mb-10",
        "tab:px-32 tab:py-14 py-10 px-8",
        "gap-4",
      )}
    >
      <TokenPrices className="mb-7 tab:hidden" />

      {/* Logo */}
      <div className="w-40 md:w-56 relative flex items-center mb-5">
        <div
          className="w-1 h-1 flex-none rounded-full bg-mid-dark-100"
          aria-hidden="true"
        />
        <div className="w-full h-[2px] bg-mid-dark-100" aria-hidden="true" />
        <div
          className="w-1 h-1 flex-none rounded-full bg-mid-dark-100"
          aria-hidden="true"
        />

        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div
            className="rounded-md p-1.5 flex flex-none items-center justify-center border border-primary"
            style={{
              "--color-primary": network.config.primaryColor,
              backgroundImage: network.config.cssGradient.replaceAll(";", ""),
            }}
          >
            <Image
              src={getLogoSVGSrc(network)}
              className="w-4 h-4 object-contain object-center rounded-full"
              width={16}
              height={16}
              alt={`${network.brand} logo`}
            />
          </div>
        </div>
      </div>

      {/* network type pill */}
      <small className="uppercase text-xs border rounded-full px-3 py-1.5 bg-white tracking-[0.105rem]">
        {network.config.type}
      </small>

      {/* Big text (network name) */}
      <h1 className="font-logo flex items-baseline gap-3 text-4xl font-medium md:text-6xl capitalize">
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

      <p className="text-sm text-muted mb-2">{network.config.description}</p>

      {/* Links */}
      {links.length > 0 && (
        <div className="flex items-center gap-6 flex-grow w-full justify-center">
          <div className="flex w-full items-center max-w-[225px] flex-grow flex-shrink">
            <div
              className="w-1 h-1 flex-none rounded-full bg-mid-dark-100"
              aria-hidden="true"
            />
            <div
              className="w-full flex-grow flex-shrink h-[2px] bg-mid-dark-100"
              aria-hidden="true"
            />
            <div
              className="w-1 h-1 flex-none rounded-full bg-mid-dark-100"
              aria-hidden="true"
            />
          </div>

          <div className="flex items-center gap-3">
            {links.map((link) => (
              <Badge
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                isSquare
                key={link.href}
              >
                {link.type === "website" && (
                  <TiltedGlobe
                    className="h-4 w-4 flex-none"
                    aria-hidden="true"
                  />
                )}
                {link.type === "x" && (
                  <XLogo className="h-4 w-4 flex-none" aria-hidden="true" />
                )}
                {link.type === "discord" && (
                  <DiscordLogo
                    className="h-4 w-4 flex-none"
                    aria-hidden="true"
                  />
                )}
                {link.type === "github" && (
                  <GithubLogo
                    className="h-4 w-4 flex-none"
                    aria-hidden="true"
                  />
                )}
              </Badge>
            ))}
          </div>

          <div className="flex w-full items-center max-w-[225px] flex-grow flex-shrink">
            <div
              className="w-1 h-1 flex-none rounded-full bg-mid-dark-100"
              aria-hidden="true"
            />
            <div
              className="w-full flex-grow flex-shrink h-[2px] bg-mid-dark-100"
              aria-hidden="true"
            />
            <div
              className="w-1 h-1 flex-none rounded-full bg-mid-dark-100"
              aria-hidden="true"
            />
          </div>
        </div>
      )}

      {/* Badges */}
      <div className="flex items-center flex-wrap justify-center w-full gap-3">
        {network.paidVersion && (
          <Badge>
            <span>Verified on</span>
            <FancyCheck className="h-4 w-4 text-blue-500" />
            <span>Modular Cloud</span>
          </Badge>
        )}

        {network.config.badges.map((badge) => (
          <Badge
            key={`badge-${badge.relation}-${badge.target}`}
            href={badge.href}
          >
            <span>{capitalize(badge.relation)} on</span>
            {badge.logoURL && (
              <Image
                src={badge.logoURL?.replace("http://127.0.0.1:3000", "")}
                alt={`Logo ${badge.target}`}
                width={14}
                height={14}
                className="h-3.5 w-3.5 flex-none object-contain object-center"
              />
            )}
            <span>{capitalize(badge.target)}</span>
          </Badge>
        ))}
      </div>
    </section>
  );
}

function NetworkSections({ network }: { network: SingleNetwork }) {
  switch (network.config.widgetLayout) {
    case "SVM":
      return (
        <section id="statistics" className="scroll-mt-20">
          <SectionHeading title="Statistics" shortcut="S" />
          <SVMWidgetLayout
            networkSlug={network.slug}
            networkBrandColor={network.config.primaryColor}
          />
        </section>
      );
    case "Celestia":
      return (
        <section id="statistics" className="scroll-mt-20">
          <SectionHeading title="Statistics" shortcut="S" />
          <CelestiaWidgetLayout
            networkSlug={network.slug}
            networkBrandColor={network.config.primaryColor}
          />
        </section>
      );
    case "Dymension":
      return (
        <section id="activity" className="scroll-mt-20">
          <SectionHeading title="Activity" shortcut="A" />
          <DymensionWidgetLayout />
        </section>
      );
    default:
      return null;
  }
}

function SectionHeading(props: { title: string; shortcut: string }) {
  return (
    <h2 className="flex items-center gap-3 mb-4 tab:mb-2">
      <div className="flex tab:hidden w-full items-center flex-grow flex-shrink">
        <div
          className="w-1 h-1 flex-none rounded-full bg-mid-dark-100"
          aria-hidden="true"
        />
        <div
          className="w-full flex-grow flex-shrink h-[2px] bg-mid-dark-100"
          aria-hidden="true"
        />
        <div
          className="w-1 h-1 flex-none rounded-full bg-mid-dark-100"
          aria-hidden="true"
        />
      </div>

      <span className="text-lg tab:text-xl">{props.title}</span>
      <ShortcutKey
        command={props.shortcut}
        className="text-sm px-2 hidden tab:block"
      />

      <div className="flex tab:hidden w-full items-center flex-grow flex-shrink">
        <div
          className="w-1 h-1 flex-none rounded-full bg-mid-dark-100"
          aria-hidden="true"
        />
        <div
          className="w-full flex-grow flex-shrink h-[2px] bg-mid-dark-100"
          aria-hidden="true"
        />
        <div
          className="w-1 h-1 flex-none rounded-full bg-mid-dark-100"
          aria-hidden="true"
        />
      </div>
    </h2>
  );
}

export async function generateStaticParams() {
  const paidNetworks = await getAllPaidNetworks();
  return paidNetworks.map((network) => ({ network: network.slug }));
}

export const revalidate = 10;
