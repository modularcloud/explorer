"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import React from "react";
import type { GroupedNetworkChains } from "~/lib/grouped-network-chains";
import type { HeadlessRoute } from "~/lib/headless-utils";
import {
  parseHeadlessRouteVercelFix,
  capitalize,
  truncateHash,
} from "~/lib/shared-utils";
import { cn } from "../shadcn/utils";

export type HeaderEntityHighlightProps = {
  groupedNetworks: GroupedNetworkChains;
};

export function HeaderEntityHighlight({
  groupedNetworks,
}: HeaderEntityHighlightProps) {
  const routeParams = useParams() as HeadlessRoute;

  const params = parseHeadlessRouteVercelFix(routeParams);

  const network = React.useMemo(() => {
    const values = Object.values(groupedNetworks).flat();
    return values.find((network) => network.id === params.network) ?? values[0];
  }, [groupedNetworks, params.network]);

  let entityType = capitalize(params.path[0]);
  let query = "";
  if (params.path.length > 1) {
    if (entityType === "Addresses") {
      entityType = "Address";
    } else if (entityType.endsWith("s")) {
      entityType = entityType.substring(0, entityType.length - 1);
    }
    query = decodeURIComponent(params.path[1]);
  }

  return (
    <div className="flex tab:hidden w-full max-w-full h-header-tabs items-center text-sm px-6">
      {/* Network logo, name & chainName */}
      <div className="inline-flex gap-2 items-center flex-none">
        <Image
          // FIXME : this is hardcoded, but it needs to be returned from the API
          src={network.logoURL}
          width={16}
          height={16}
          alt={`Logo ${network.brandName}`}
          className="object-center object-contain flex-shrink-0 rounded-full"
        />

        <span className="flex-none">
          <span>{capitalize(network.brandName)}</span>
          <span>&nbsp;</span>
          <span>{capitalize(network.displayName)}</span>
          <span>&nbsp;/&nbsp;</span>
        </span>
      </div>

      {/* Query */}
      <p
        className={cn(
          "text-muted min-w-0",
          "whitespace-nowrap text-ellipsis overflow-x-hidden flex-shrink flex-grow-0",
        )}
      >
        {entityType}&nbsp;{query}
      </p>
    </div>
  );
}
