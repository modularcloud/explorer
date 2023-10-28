"use client";

import * as ToggleGroup from "@radix-ui/react-toggle-group";
import * as Separator from "@radix-ui/react-separator";
import React, { useContext } from "react";
import { ViewContext, ViewDispatchContext } from "~/ui/view-context/client";
import SvgListViewOn from "~/ui/icons/ListViewOn";
import SvgListViewOff from "~/ui/icons/ListViewOff";
import SvgCardOn from "~/ui/icons/CardOn";
import SvgCardOff from "~/ui/icons/CardOff";
import { AssociatedViewType, EntityViewType } from "~/ui/view-context/types";
import { useParams } from "next/navigation";
import SvgCubesOff from "~/ui/icons/CubesOff";
import SvgCodeOff from "~/ui/icons/CodeOff";
import SvgCodeOn from "~/ui/icons/CodeOn";
import SvgCubesOn from "~/ui/icons/CubesOn";

const OnMap: Record<AssociatedViewType | EntityViewType, React.ReactNode> = {
  table: <SvgListViewOn />,
  feed: <SvgCardOn />,
  overview: <SvgCubesOn />,
  raw: <SvgCodeOn />,
};

const OffMap: Record<AssociatedViewType | EntityViewType, React.ReactNode> = {
  table: <SvgListViewOff />,
  feed: <SvgCardOff />,
  overview: <SvgCubesOff />,
  raw: <SvgCodeOff />,
};

export function ViewSwitcher() {
  // An entity can have two options: "overview" and "raw" data. Eventually, this will be configurable for each entity.
  const entityOptions: EntityViewType[] = ["overview", "raw"];

  // if we are on the /[section] route, then we want to show the options for the associated page: "table", "feed"
  const associatedOptions: AssociatedViewType[] = ["table", "feed"];
  const params = useParams();

  const isAssociatedPage = params !== null && "section" in params;

  const view = useContext(ViewContext);
  const selectedView = isAssociatedPage ? view.associated : view.entity;
  const setView = useContext(ViewDispatchContext);
  return (
    <div>
      <ToggleGroup.Root
        type="single"
        className="flex items-center"
        value={selectedView}
        onValueChange={setView ?? (() => {})}
      >
        {(isAssociatedPage ? associatedOptions : entityOptions).map(
          (option, index) => {
            const toggleGroup = (
              <ToggleGroup.Item
                key={index}
                value={option}
                className="h-[34px] w-[34px] p-[7px]"
              >
                {selectedView === option ? OnMap[option] : OffMap[option]}
              </ToggleGroup.Item>
            );
            if (index !== 0) {
              return (
                <React.Fragment key={index}>
                  <Separator.Root
                    className="mx-1 h-5 w-px bg-slate-200"
                    decorative
                    orientation="vertical"
                  />
                  {toggleGroup}
                </React.Fragment>
              );
            }
            return toggleGroup;
          },
        )}
      </ToggleGroup.Root>
    </div>
  );
}
