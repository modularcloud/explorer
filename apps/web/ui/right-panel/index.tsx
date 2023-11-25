import "server-only";

import * as React from "react";
// components
import Image from "next/image";
import { Tooltip } from "~/ui/tooltip";
import {
  Electricity,
  FancyCheck,
  KeyboardArrowDown,
  KeyboardArrowLeft,
  KeyboardArrowRight,
  KeyboardArrowUp,
} from "~/ui/icons";
import { ShortcutKey } from "~/ui/shortcut-key";
import { AssociatedComponentList } from "./associated";
import { SpotlightComponentList } from "./spotlight";
import { Skeleton } from "~/ui/skeleton";

// utils
import { capitalize, range } from "~/lib/shared-utils";
import { cn } from "~/ui/shadcn/utils";
import { isMacLike } from "~/lib/shared-utils";
import { headers } from "next/headers";

// types
import type { ShortcutKeyProps } from "~/ui/shortcut-key";
import type { SingleNetwork } from "~/lib/network";
import type { Page } from "@modularcloud/headless";

interface HotkeyEntryProps {
  label: string;
  keys: Array<{ cmd: ShortcutKeyProps["command"]; label?: string }>;
  isLast?: boolean;
  isFirst?: boolean;
}

function HotkeyEntry({ label, keys, isLast, isFirst }: HotkeyEntryProps) {
  return (
    <div
      className={cn(
        "grid gap-4 w-full grid-cols-5 pl-7 items-center relative py-2",
      )}
    >
      {/* Left indentation marker */}
      <div
        className="grid items-start h-full absolute left-1 top-0 bottom-0"
        aria-hidden="true"
      >
        <div
          className={cn("w-[1px] bg-muted/25 absolute top-0", {
            "bottom-0 rounded-md": !isLast,
            "bottom-1/2 rounded-t-md": isLast,
          })}
        />
        <div className="w-3 h-[1px] bg-muted/25 rounded-r-md absolute top-1/2 left-[1px]" />
      </div>

      <dt className="text-foreground font-medium col-span-2">{label}</dt>
      <dd
        className={cn(
          "font-normal col-span-3 flex gap-2 justify-end items-center",
          {
            "pt-4": isFirst,
          },
        )}
      >
        {keys.map(({ cmd, label }, index) => (
          <ShortcutKey command={cmd} label={label} key={index} />
        ))}
      </dd>
    </div>
  );
}

interface Props {
  data: Page["sidebar"];
  network: SingleNetwork;
}

export function RightPanel({ data, network }: Props) {
  const { properties, headerKey, headerValue } = data;

  const allAttributes = Object.entries(properties);
  return (
    <div
      className="w-full grid h-full max-h-full auto-rows-min"
      style={{
        backgroundImage: "url(/images/grid-layout-vector.svg)",
        backgroundPosition: "bottom center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
      }}
    >
      <section
        id="header"
        className="border-b px-6 py-5 gap-4 flex items-center w-full flex-shrink"
      >
        {/* <Image src={data.logo} alt="Logo" /> */}
        <Image
          // FIXME : this is hardcoded, but it needs to be returned from the API
          src={`/images/celestia-logo-small.png`}
          width={24}
          height={24}
          alt={`Logo ${network.chainBrand}`}
          className="object-center object-contain flex-shrink-0"
        />

        <h2 className="text-lg font-medium">
          {capitalize(network.chainBrand)} {capitalize(network.chainName)}
        </h2>

        {network.paidVersion && (
          <Tooltip label="This chain is verified">
            <span tabIndex={0} className="rounded-md">
              <FancyCheck className="text-primary" aria-hidden="true" />
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

        {/* <dl className="w-full">
          <div className="gap-4 w-full">
            <h3 className="text-foreground font-medium flex items-center gap-4 col-span-2 text-lg py-3.5">
              <Electricity aria-hidden="true" className="flex-shrink-0" />
              Quick Actions
            </h3>

            <HotkeyEntry
              label="Focus"
              keys={[
                {
                  cmd: (
                    <KeyboardArrowLeft className="my-1" aria-hidden="true" />
                  ),
                  label: "Arrow left",
                },

                {
                  cmd: (
                    <KeyboardArrowUp className="my-1.5" aria-hidden="true" />
                  ),
                  label: "Arrow up",
                },
                {
                  cmd: (
                    <KeyboardArrowDown className="my-1.5" aria-hidden="true" />
                  ),
                  label: "Arrow down",
                },
                {
                  cmd: (
                    <KeyboardArrowRight className="my-1" aria-hidden="true" />
                  ),
                  label: "Arrow right",
                },
              ]}
              isFirst
            />
            <HotkeyEntry
              label="Open"
              keys={[
                {
                  cmd: "Enter",
                },
              ]}
            />
            <HotkeyEntry
              label="Copy"
              keys={[
                isMacLike(headers().get("user-agent"))
                  ? {
                      cmd: "⌘",
                      label: "Command",
                    }
                  : {
                      cmd: "Ctrl",
                      label: "Control",
                    },
                {
                  cmd: "C",
                },
              ]}
            />
            <HotkeyEntry
              label="Switch Tabs"
              keys={[
                {
                  cmd: "Ctrl",
                  label: "Control",
                },
                {
                  cmd: "1-9",
                  label: "One to nine",
                },
              ]}
            />
            <HotkeyEntry
              label="Search"
              keys={[
                {
                  cmd: "/",
                },
              ]}
              isLast
            />
          </div>
        </dl> */}
      </section>
    </div>
  );
}

export function RightPanelSkeleton() {
  return (
    <div
      className="w-full grid h-full max-h-full auto-rows-min"
      style={{
        backgroundImage: "url(/images/grid-layout-vector.svg)",
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
  );
}
