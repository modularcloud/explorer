import "server-only";
import * as React from "react";
import type { SearchOption } from "~/lib/shared-utils";
import { getAllNetworksCached } from "~/lib/network";

interface Props {
  network: SearchOption;
}

export async function DymensionWidgetLayout({ network }: Props) {
  if (!network) return null;

  const allNetworks = (await getAllNetworksCached()).filter(
    (net) => net.slug !== network.id,
  );

  return <div className="grid grid-cols-4"></div>;
}
