"use client";

import * as React from "react";
import { useParams, useRouter } from "next/navigation";
import { useHotkeyListener } from "~/lib/hooks/use-hotkey-listener";
import { FetchLoadArgs, range, slugify } from "~/lib/shared-utils";
import { ENTITY_INDEX_TAB_NAME } from "~/lib/constants";

interface Props {
  tabList: string[];
}

export function HeaderTabsHotkeyListener({ tabList }: Props) {
  const router = useRouter();
  const params = useParams() as FetchLoadArgs & { section?: string };

  useHotkeyListener({
    keys: range(1, tabList.length).map(String),
    listener(keyPressed) {
      const selectedTab = tabList[Number(keyPressed) - 1];
      console.log({ keyPressed, selectedTab });
      if (selectedTab) {
        router.push(
          `/${params.network}/${params.type}/${params.query}/${
            selectedTab === ENTITY_INDEX_TAB_NAME ? "" : slugify(selectedTab)
          }`,
        );
      }
    },
    modifier: "CTRL",
  });
  return null;
}
