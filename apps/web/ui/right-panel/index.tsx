import * as React from "react";
// components
import Image from "next/image";
import { Tooltip } from "~/ui/tooltip";
import { FancyCheck } from "~/ui/icons";

// utils
import { capitalize } from "~/lib/utils";

// types
import type { Sidebar } from "~/ecs/components/sidebar";
import type { SingleNetwork } from "~/lib/network";

interface Props {
  data: Sidebar;
  network: SingleNetwork;
}

export function RightPanel({ data, network }: Props) {
  return (
    <div className="w-full">
      <section id="header" className="border-b p-8 gap-4 flex items-center">
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
      <section id="components"></section>
    </div>
  );
}
