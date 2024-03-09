"use client";
import * as React from "react";

import { MCLogo } from "~/ui/mc-logo";
import Link from "next/link";
import Image from "next/image";
import { getBrandSVGLogoSRC } from "~/lib/shared-utils";
import { Heart } from "~/ui/icons";
import { useCurrentNetwork } from "~/lib/hooks/use-current-network";

export function BrandedLogo() {
  const network = useCurrentNetwork();

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
        <Heart
          className="h-4 w-4 branded-logo-heart opacity-0 flex-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white"
          aria-hidden="true"
        />
        <Image
          src={
            network.ecosystems.includes("dymension-froopyland")
              ? "/images/dymension-logo-white.svg"
              : getBrandSVGLogoSRC(network.brandName) ?? network.logoURL
          }
          alt="Logo network"
          width={32}
          height={32}
          className="h-4 w-4 branded-logo rounded-full opacity-0 object-contain object-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        />
      </div>
    </Link>
  );
}
