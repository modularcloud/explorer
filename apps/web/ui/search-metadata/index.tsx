"use client";
import * as React from "react";

import { getMetadata } from "~/lib/shared-utils";

interface Props {
  correctPath: string;
  network: {
    slug: string;
    brand: string;
    chainName: string;
  };
}

export function SearchMetadata({ correctPath, network }: Props) {
  const { title, description } = getMetadata(
    {
      network: network.slug,
      path: correctPath
        .replace(`/${network.slug}`, "")
        .split("/")
        .filter(Boolean),
    },
    network,
  );

  return (
    <>
      <title>{title} - Modular Cloud</title>
      {description && <meta name="description" content={description} />}
    </>
  );
}
