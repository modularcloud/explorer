"use client";
import * as React from "react";
import { ArrowRight, Recycle, FancyCheck } from "~/ui/icons";
import { useParams } from "next/navigation";
import { useThemeContext } from "~/app/theme-context-provider";
import clsx from "clsx";

import type { OptionGroups } from "~/lib/utils";

interface Props {
  optionGroups: OptionGroups;
}

export function Search({ optionGroups }: Props) {
  const params = useParams();
  const [theme, setTheme] = useThemeContext();

  const network = React.useMemo(() => {
    const values = Object.values(optionGroups).flat();
    return values.find((network) => network.id === params.network) ?? values[0];
  }, [optionGroups, params.network]);

  // Set main Color to correspond to the network's main color
  if (network.mainColor && network.mainColor !== theme.mainColor) {
    setTheme({
      mainColor: network.mainColor,
    });
    return null;
  }
  return (
    <div
      style={{
        // @ts-expect-error this is a CSS variable
        "--main-color": theme.mainColor,
      }}
      className={clsx(
        "flex items-center rounded-lg border border-mid-dark-100 bg-white max-w-[450px] w-full mx-auto",
        "focus-within:border-[var(--main-color)] focus-within:border-1.5",
        "shadow-sm",
      )}
    >
      <button
        className={clsx(
          "px-4 py-2 border-r border-mid-dark-100 rounded-l-lg font-medium",
          "hover:bg-muted/5 transition duration-200",
          "inline-flex gap-4 items-center",
        )}
      >
        <div className="inline-flex gap-2 items-center">
          <span>{network.displayName}</span>
          {!network.verified && (
            <FancyCheck className="text-[var(--main-color)]" />
          )}
        </div>
        <div>
          <Recycle className="text-muted" />
        </div>
      </button>
      <div
        className={clsx(
          "flex items-center px-4 py-2 rounded-r-lg",
          "hover:bg-muted/5 transition duration-200",
          "flex-1",
        )}
      >
        <input
          type="text"
          placeholder="Go to hash"
          className="focus:outline-none placeholder:text-muted font-medium bg-transparent flex-1"
        />

        <ArrowRight className="text-muted" />
      </div>
    </div>
  );
}
