"use client";

import * as ToggleGroup from "@radix-ui/react-toggle-group";
import * as Separator from "@radix-ui/react-separator";
import { useContext } from "react";
import {
  AssociatedViewContext,
  AssociatedViewDispatchContext,
} from "../associated/context/client";
import SvgListViewOn from "../icons/ListViewOn";
import SvgListViewOff from "../icons/ListViewOff";
import SvgCardOn from "../icons/CardOn";
import SvgCardOff from "../icons/CardOff";

export function ViewSwitcher() {
  const view = useContext(AssociatedViewContext);
  const setView = useContext(AssociatedViewDispatchContext);
  return (
    <div>
      <ToggleGroup.Root
        type="single"
        className="flex items-center"
        value={view}
        onValueChange={setView ?? (() => {})}
      >
        <ToggleGroup.Item value="table" className="h-[34px] w-[34px] p-[7px]">
          {view === "table" ? <SvgListViewOn /> : <SvgListViewOff />}
        </ToggleGroup.Item>
        <Separator.Root
          className="mx-1 bg-slate-200 w-px h-5"
          decorative
          orientation="vertical"
        />
        <ToggleGroup.Item value="feed" className="h-[34px] w-[34px] p-[7px]">
          {view === "feed" ? <SvgCardOn /> : <SvgCardOff />}
        </ToggleGroup.Item>
      </ToggleGroup.Root>
    </div>
  );
}
