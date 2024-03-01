"use client";
import * as React from "react";

import { useParams } from "next/navigation";
import type { HeadlessRoute } from "~/lib/headless-utils";
import { MCLogo } from "~/ui/mc-logo";
import { useGroupedNetworksContext } from "~/ui/grouped-networks-context";
import Link from "next/link";

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
    <Link href="/">
      <div
        className="rounded-md p-1.5 flex flex-none items-center justify-center border border-primary"
        style={{
          "--color-primary": network.brandColor,
          backgroundImage: network.brandCSSGradient.replaceAll(";", ""),
        }}
      >
        <MCLogo className="h-4 w-4" />
      </div>
    </Link>
  );
}
