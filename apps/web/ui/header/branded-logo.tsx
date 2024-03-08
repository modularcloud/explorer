"use client";
import * as React from "react";

import { useParams } from "next/navigation";
import type { HeadlessRoute } from "~/lib/headless-utils";
import { MCLogo } from "~/ui/mc-logo";
import { useGroupedNetworksContext } from "~/ui/grouped-networks-context";
import Link from "next/link";
import Image from "next/image";
import { getEcosystemSVGLogoSRC } from "~/lib/shared-utils";
import { Heart } from "../icons";

export function BrandedLogo() {
  const params = useParams() as Pick<HeadlessRoute, "network">;
  const optionGroups = useGroupedNetworksContext();

  const network = React.useMemo(() => {
    const values = Object.values(optionGroups).flat();
    return (
      values.find((network) => network.slug === params.network) ?? values[0]
    );
  }, [optionGroups, params.network]);

  return (
    <Link href="/" className="rounded-md">
      <div
        className="relative rounded-md p-1.5 h-8 w-8 group flex flex-none items-center justify-center border border-primary"
        style={{
          "--color-primary": network.brandColor,
          backgroundImage: network.brandCSSGradient.replaceAll(";", ""),
        }}
      >
        <MCLogo className="h-4 w-4 branded-logo-modular-cloud" />
        <Image
          src={getEcosystemSVGLogoSRC(network.brandName) ?? network.logoURL}
          alt="Logo network"
          width={32}
          height={32}
          className="h-4 w-4 branded-logo opacity-0 object-contain object-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        />
        <Heart
          className="h-4 w-4 animate-fadeIn branded-logo-heart opacity-0 flex-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white"
          aria-hidden="true"
        />
      </div>
    </Link>
  );
}
