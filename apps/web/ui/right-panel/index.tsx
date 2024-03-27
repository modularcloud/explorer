import "server-only";

import * as React from "react";
// components
import Image from "next/image";
import { Tooltip } from "~/ui/tooltip";
import { FancyCheck } from "~/ui/icons";
import { ShortcutKey } from "~/ui/shortcut-key";
import { AssociatedComponentList } from "./associated";
import { SpotlightComponentList } from "./spotlight";
import { Skeleton } from "~/ui/skeleton";

// utils
import { capitalize, range } from "~/lib/shared-utils";
import { cn } from "~/ui/shadcn/utils";

// types
import type { SingleNetwork } from "~/lib/network";
import type { Page } from "@modularcloud/headless";

interface Props {
  data: Page["sidebar"];
  network: SingleNetwork;
}

export function RightPanel({ data, network }: Props) {
  const { properties, headerKey, headerValue } = data;

  const allAttributes = Object.entries(properties);

  return (
    <aside
      className={cn(
        // the height of the sidebar is the total height of the screen - the height of the <Header /> component
        "h-[calc(100vh_-var(--header-size))] w-[27rem]",
        "bg-muted-100 hidden lg:block",
        "fixed top-[calc(var(--header-size)+var(--titlebar-size))] bottom-0 right-0",
        "overflow-hidden z-40",
      )}
    >
      <div
        className="w-full grid h-full max-h-full auto-rows-min"
        style={{
          backgroundPosition: "bottom center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "contain",
        }}
      >
        <section
          id="header"
          className="border-b px-6 py-5 gap-2 flex items-center w-full flex-shrink h-header-tabs"
        >
          {/* <Image src={data.logo} alt="Logo" /> */}
          <Image
            // FIXME : this is hardcoded, but it needs to be returned from the API
            src={network.config.logoUrl}
            width={24}
            height={24}
            alt={`Logo ${network.brand}`}
            className="object-center object-contain flex-shrink-0 rounded-full"
          />

          <h2 className="text-lg font-medium">
            {capitalize(network.brand)} {capitalize(network.chainName)}
          </h2>

          {network.paidVersion && (
            <Tooltip label="This chain is verified">
              <span tabIndex={0} className="rounded-md">
                <FancyCheck
                  className="text-primary h-6 w-6 flex-none"
                  aria-hidden="true"
                />
              </span>
            </Tooltip>
          )}
        </section>
        <section
          id="components"
          className="pt-4 pb-12 px-6 w-full h-full overflow-y-scroll flex flex-col gap-6 relative"
        >
          <AssociatedComponentList
            headerValue={headerValue}
            headerKey={headerKey}
            defaultAttributes={allAttributes}
          />
          <SpotlightComponentList />
        </section>
      </div>
    </aside>
  );
}

export function RightPanelSkeleton() {
  return (
    <aside
      className={cn(
        // the height of the sidebar is the total height of the screen - the height of the <Header /> component
        "h-[calc(100vh_-var(--header-size))] w-[27rem]",
        "bg-muted-100 hidden lg:block",
        "fixed top-[calc(var(--header-size)+var(--titlebar-size))] bottom-0 right-0",
        "overflow-hidden z-40",
      )}
    >
      <div
        className="w-full grid h-full max-h-full auto-rows-min"
        style={{
          backgroundPosition: "bottom center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "contain",
        }}
      >
        <section
          id="header"
          className="border-b px-6 py-5 gap-4 flex items-center w-full flex-shrink"
        >
          <Skeleton shape="circle" className="h-8 w-8" />
          <Skeleton className="h-6 w-56" />
        </section>

        <section
          id="components"
          className="pt-4 pb-12 px-6 w-full h-full overflow-y-scroll flex flex-col gap-8 relative"
        >
          <div className="w-full">
            <div className="grid gap-4 text-base w-full grid-cols-5 mb-2">
              <div className="flex items-center gap-2 col-span-2">
                <Skeleton className="h-6 w-6" />
                <Skeleton className="h-6 w-full" />
              </div>
              <dd className="col-span-3 flex justify-end">
                <Skeleton className="h-6 w-32" />
              </dd>
            </div>

            <div className="grid gap-4 w-full grid-cols-5 pl-7 items-baseline relative">
              {/* Left indentation marker */}
              <div
                className="grid items-start h-full absolute left-2 top-0 bottom-0"
                aria-hidden="true"
              >
                <div
                  className={cn(
                    "w-[1px] bg-muted/25 absolute top-0 bottom-1/2 rounded-t-md",
                  )}
                />
                <div className="w-3 h-[1px] bg-muted/25 rounded-r-md absolute top-1/2 left-[1px]" />
              </div>

              <div className="col-span-2 py-2">
                <Skeleton className="h-6 w-full" />
              </div>

              <div className="col-span-3 py-2 flex justify-end">
                <Skeleton className="h-6 w-32" />
              </div>
            </div>
          </div>

          <div className="w-full">
            <div className="grid gap-4 text-base w-full grid-cols-5 mb-2">
              <div className="flex items-center gap-2 col-span-2">
                <Skeleton className="h-6 w-6" />
                <Skeleton className="h-6 w-full" />
              </div>
              <dd className="col-span-3 flex justify-end">
                <Skeleton className="h-6 w-32" />
              </dd>
            </div>

            {range(0, 3).map((index) => (
              <div className="grid gap-4 w-full grid-cols-5 pl-7 items-baseline relative">
                {/* Left indentation marker */}
                <div
                  className="grid items-start h-full absolute left-2 top-0 bottom-0"
                  aria-hidden="true"
                >
                  <div
                    className={cn("w-[1px] bg-muted/25 absolute top-0", {
                      "bottom-0 rounded-md": index !== 3,
                      "bottom-1/2 rounded-t-md": index === 3,
                    })}
                  />
                  <div className="w-3 h-[1px] bg-muted/25 rounded-r-md absolute top-1/2 left-[1px]" />
                </div>

                <div className="col-span-2 py-2">
                  <Skeleton className="h-6 w-full" />
                </div>

                <div className="col-span-3 py-2 flex justify-end">
                  <Skeleton className="h-6 w-32" />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </aside>
  );
}
