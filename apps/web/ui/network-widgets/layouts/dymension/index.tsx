import "server-only";
import * as React from "react";
import { Card } from "~/ui/card";
import Image from "next/image";
import Link from "next/link";
import { cn } from "~/ui/shadcn/utils";
import type { SingleNetwork } from "~/lib/network";

interface Props {
  networkSlug: string;
  allDymensionNetworks: Array<SingleNetwork>;
}

export async function DymensionWidgetLayout({
  networkSlug,
  allDymensionNetworks,
}: Props) {
  const allNetworks = allDymensionNetworks.filter(
    (net) => net.slug !== networkSlug,
  );

  return (
    <>
      <h2 className="text-center text-muted text-xs my-4">
        A dymension ecosystem chain
      </h2>
      <ul
        className={cn(
          "grid grid-cols-2 gap-4",
          "md:grid-cols-3 md:gap-6",
          "tab:grid-cols-4 tab:gap-8",
          "lg:grid-cols-5",
        )}
      >
        {allNetworks.map((network) => (
          <li key={network.slug}>
            <Card
              className={cn(
                "h-[11.75rem] relative flex flex-col items-center p-5 gap-1 w-full",
                "hover:bg-muted-100 transition-colors duration-150",
                "focus-within:border-primary",
              )}
              style={{
                // @ts-expect-error this is a CSS variable
                "--color-primary": network.config.primaryColor,
              }}
            >
              <Image
                src={network.config.logoUrl}
                height={108}
                width={108}
                alt={`${network.brand} ${network.chainName} logo`}
                className="object-center rounded-full w-24 aspect-square"
              />
              <span className="font-medium text-xs capitalize">
                {network.brand}
              </span>
              <span className="text-muted text-xs">{network.chainName}</span>
              <Link
                href={`/${network.slug}`}
                className="after:absolute after:inset-0 focus:outline-none"
              >
                <span className="sr-only">
                  {network.brand} {network.chainName}
                </span>
              </Link>
            </Card>
          </li>
        ))}
      </ul>
    </>
  );
}
