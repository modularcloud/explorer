"use client";

import * as ToggleGroup from "@radix-ui/react-toggle-group";
import * as Separator from "@radix-ui/react-separator";
import ListViewOn from "../../app/[network]/[type]/(standard)/[query]/[[...viewPath]]/(components)/(icons)/ListViewOn";
import ListViewOff from "../../app/[network]/[type]/(standard)/[query]/[[...viewPath]]/(components)/(icons)/ListViewOff";
import CardOn from "../../app/[network]/[type]/(standard)/[query]/[[...viewPath]]/(components)/(icons)/CardOn";
import CardOff from "../../app/[network]/[type]/(standard)/[query]/[[...viewPath]]/(components)/(icons)/CardOff";
import { useContext } from "react";
import {
  AssociatedViewContext,
  AssociatedViewDispatchContext,
} from "../associated/context/client";

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
        <ToggleGroup.Item
          value="table"
          className="h-[34px] w-[34px] p-[7px] disabled:cursor-pointer"
          disabled={view === "table"}
        >
          {view === "table" ? <ListViewOn /> : <ListViewOff />}
        </ToggleGroup.Item>
        <Separator.Root
          className="mx-1 bg-slate-200 w-px h-5"
          decorative
          orientation="vertical"
        />
        <ToggleGroup.Item
          value="feed"
          className="h-[34px] w-[34px] p-[7px] disabled:cursor-pointer"
          disabled={view === "feed"}
        >
          {view === "feed" ? <CardOn /> : <CardOff />}
        </ToggleGroup.Item>
      </ToggleGroup.Root>
    </div>
  );
}
