/* eslint-disable @next/next/no-img-element */
"use client";

import * as React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import type { FetchLoadArgs } from "~/lib/utils";

interface Props {}

export function HeaderLogoLink({}: Props) {
  const params = useParams() as Omit<Partial<FetchLoadArgs>, "network"> & {
    network: string;
  };
  return (
    <Link href={`/${params.network}`} className="flex items-center gap-4">
      <img
        src="/images/mc-logo.svg"
        alt="ModularCloud Logo"
        className="h-5 w-5"
      />

      <h1 className="font-medium text-xl">Modular Cloud</h1>
    </Link>
  );
}
