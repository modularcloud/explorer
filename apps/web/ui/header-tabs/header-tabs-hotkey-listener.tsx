"use client";

// components
import * as React from "react";
import { useParams, useRouter } from "next/navigation";
import { useHotkey } from "~/lib/hooks/use-hotkey";

// utils
import { range } from "~/lib/shared-utils";

// types
import type { HeadlessRoute } from "~/lib/headless-utils";
interface Props {
  tabList: string[];
}

export function HeaderTabsHotkeyListener({ tabList }: Props) {
  const router = useRouter();
  const params = useParams() as HeadlessRoute;

  useHotkey({
    keys: range(1, tabList.length).map(String),
    listener(keyPressed) {
      const selectedTab = tabList[Number(keyPressed) - 1];
      if (selectedTab) {
        router.push(`/${params.network}/${selectedTab}`);
        return true;
      }
      return false;
    },
    modifier: "CTRL",
  });
  return null;
}
