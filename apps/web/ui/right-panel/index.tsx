import * as React from "react";
// components
import Image from "next/image";
import { Tooltip } from "~/ui/tooltip";
import { ArrowLeftRight, FancyCheck } from "~/ui/icons";
import { CopyableValue } from "~/ui/copyable-value";
import { Status } from "~/ui/status";

// utils
import { capitalize } from "~/lib/utils";
import { cn } from "~/ui/shadcn/utils";

// types
import type { Sidebar } from "~/ecs/components/sidebar";
import type { SingleNetwork } from "~/lib/network";
import type { Value } from "~/schemas/value";

interface EntryProps {
  label: string;
  value: Value;
  isLast: boolean;
}

function Entry({ label, value, isLast }: EntryProps) {
  const { type, payload } = value;

  return (
    <div className="grid gap-4 w-full grid-cols-5 pl-7 items-baseline relative">
      {/* Left indentation marker ? */}
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
            value={payload!.toString()}
            hideCopyIcon
            className="justify-end"
          />
        </dd>
      )}
    </div>
  );
}

interface Props {
  data: Sidebar;
  network: SingleNetwork;
}

export function RightPanel({ data, network }: Props) {
  const { attributes, asyncAttributes, logo, entityTypeName, entityId } = data;

  const allAttributes = Object.entries(attributes).filter(
    ([, entry]) => entry.payload !== null && entry.payload !== undefined,
  );

  return (
    <div className="w-full grid h-full max-h-full">
      <section
        id="header"
        className="border-b p-8 gap-4 flex items-center w-full"
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
        className="py-6 px-8 w-full h-full overflow-y-scroll"
      >
        <dl className="w-full">
          <div className="grid gap-4 text-lg w-full grid-cols-5">
            <dt className="text-foreground font-medium flex items-center gap-4 col-span-2">
              <ArrowLeftRight aria-hidden="true" className="flex-shrink-0" />
              {entityTypeName}
            </dt>
            <dd className="font-normal col-span-3">
              <CopyableValue
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
      </section>
    </div>
  );
}
