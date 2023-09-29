import * as React from "react";
// components
import Image from "next/image";
import { Tooltip } from "~/ui/tooltip";
import {
  ArrowLeftRight,
  Electricity,
  FancyCheck,
  KeyboardArrowDown,
  KeyboardArrowLeft,
  KeyboardArrowRight,
  KeyboardArrowUp,
} from "~/ui/icons";
import { CopyableValue } from "~/ui/copyable-value";
import { Status } from "~/ui/status";
import { ShortcutKey } from "~/ui/shortcut-key";

// utils
import { capitalize } from "~/lib/utils";
import { cn } from "~/ui/shadcn/utils";
import { headers } from "next/headers";

// types
import type { ShortcutKeyProps } from "~/ui/shortcut-key";
import type { Sidebar } from "~/ecs/components/sidebar";
import type { SingleNetwork } from "~/lib/network";
import type { Value } from "~/schemas/value";

interface EntryProps {
  label: string;
  value: Value;
  isLast?: boolean;
}

function Entry({ label, value, isLast }: EntryProps) {
  const { type, payload } = value;

  return (
    <div className="grid gap-4 w-full grid-cols-5 pl-7 items-baseline relative">
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
      {type === "status" && (
        <dd className={cn("col-span-3 flex justify-end px-4")}>
          <Status status={payload!} noBorders />
        </dd>
      )}
      {type === "standard" && (
        <dd className="font-normal col-span-3 flex">
          <CopyableValue
            tooltipPosition="left"
            value={payload!.toString()}
            hideCopyIcon
            className="justify-end"
          />
        </dd>
      )}
    </div>
  );
}

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
  data: Sidebar;
  network: SingleNetwork;
  /**
   * to show a different mapping of hotkeys
   * when we are on a "list" view, we can navigate with arrow keys and can copy/paste & open new links
   */
  currentSectionType?: "list" | "overview";
}

export function RightPanel({ data, network }: Props) {
  const { attributes, entityTypeName, entityId } = data;

  // TODO : directly change the attributes to show on the sidebar where the data is fetched
  // so that we don't have to limit the size to only 7 items
  const allAttributes = Object.entries(attributes)
    .slice(0, 7)
    .filter(
      ([, entry]) => entry.payload !== null && entry.payload !== undefined,
    );

  const ua = headers().get("user-agent");
  const isMacLike = !ua ? false : /(Mac|iPhone|iPod|iPad)/i.test(ua);

  return (
    <div className="w-full grid h-full max-h-full auto-rows-min">
      <section
        id="header"
        className="border-b px-8 py-6 gap-4 flex items-center w-full flex-shrink"
      >
        {/* <Image src={data.logo} alt="Logo" /> */}
        <Image
          // FIXME : this is hardcoded, but it needs to be returned from the API
          src={`/images/nautilus-logo-small.png`}
          width={24}
          height={24}
          alt={`Logo ${network.chainBrand}`}
          className="object-center object-contain flex-shrink-0"
        />

        <h2 className="text-xl font-medium">
          {capitalize(network.chainBrand)} {capitalize(network.chainName)}
        </h2>

        {network.paidVersion && (
          <Tooltip label="This chain is verified">
            <span>
              <FancyCheck className="text-primary" aria-hidden="true" />
            </span>
          </Tooltip>
        )}
      </section>
      <section
        id="components"
        className="pt-4 pb-12 px-8 w-full h-full overflow-y-scroll flex flex-col gap-6 relative"
      >
        <dl className="w-full">
          <div className="grid gap-4 text-lg w-full grid-cols-5">
            <dt className="text-foreground font-medium flex items-center gap-4 col-span-2">
              <ArrowLeftRight aria-hidden="true" className="flex-shrink-0" />
              {entityTypeName}
            </dt>
            <dd className="font-normal col-span-3">
              <CopyableValue
                tooltipPosition="left"
                value={entityId}
                hideCopyIcon
                className="[&>button]:uppercase"
              />
            </dd>
          </div>
          {allAttributes.map(([name, entry], index) => (
            <Entry
              key={name}
              label={name}
              value={entry}
              isLast={index === allAttributes.length - 1}
            />
          ))}
        </dl>

        <dl className="w-full">
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
                isMacLike
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
              label="Search"
              keys={[
                {
                  cmd: "/",
                },
              ]}
              isLast
            />
          </div>
        </dl>
      </section>
    </div>
  );
}
