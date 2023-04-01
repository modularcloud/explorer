"use client";

import * as ToggleGroup from "@radix-ui/react-toggle-group";
import * as Separator from "@radix-ui/react-separator";
import ListViewOn from "./(icons)/ListViewOn";
import ListViewOff from "./(icons)/ListViewOff";
import CardOn from "./(icons)/CardOn";
import CardOff from "./(icons)/CardOff";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

export function ViewSwitcher() {
  const router = useRouter();
  const pathname = usePathname();

  /**
   * TODO: more robust way to do this
   */
  const defaultSelected = useMemo(() => {
    if (!pathname) return "table";
    if (pathname.includes("table")) return "table";
    if (pathname.includes("feed")) return "feed";
    return "table";
  }, [pathname]);

  const tablePath = useMemo(() => {
    if (!pathname) return;
    if (!pathname.includes("table") && !pathname.includes("feed")) {
      return pathname + "/table";
    }

    return pathname.replace("feed", "table");
  }, [pathname]);
  
  const feedPath = useMemo(() => {
    if (!pathname) return;
    if (!pathname.includes("table") && !pathname.includes("feed")) {
      return pathname + "/feed";
    }

    return pathname.replace("table", "feed");
  }, [pathname]);

  const [selected, setSelected] = useState(defaultSelected);

  useEffect(() => {
    if (tablePath) {
      router.prefetch(tablePath);
    }
    if (feedPath) {
      router.prefetch(feedPath);
    }
  }, [tablePath, feedPath]);

  return (
    <div>
      <ToggleGroup.Root
        type="single"
        className="flex items-center"
        defaultValue={defaultSelected}
        onValueChange={(value: string) => {
          setSelected(value);
          if (value === "table" && tablePath) {
            router.push(tablePath);
          }
          if (value === "feed" && feedPath) {
            router.push(feedPath);
          }
        }}
      >
        <ToggleGroup.Item value="table" className="h-[34px] w-[34px] p-[7px]">
          {selected === "table" ? <ListViewOn /> : <ListViewOff />}
        </ToggleGroup.Item>
        <Separator.Root
          className="mx-1 bg-slate-200 w-px h-5"
          decorative
          orientation="vertical"
        />
        <ToggleGroup.Item value="feed" className="h-[34px] w-[34px] p-[7px]">
          {selected === "feed" ? <CardOn /> : <CardOff />}
        </ToggleGroup.Item>
      </ToggleGroup.Root>
    </div>
  );
}
