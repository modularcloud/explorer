"use client";

import * as ToggleGroup from "@radix-ui/react-toggle-group";
import * as Separator from "@radix-ui/react-separator";
import { useContext } from "react";
import { ViewContext, ViewDispatchContext } from "../view-context/client";
import SvgListViewOn from "../icons/ListViewOn";
import SvgListViewOff from "../icons/ListViewOff";
import SvgCardOn from "../icons/CardOn";
import SvgCardOff from "../icons/CardOff";
import { AssociatedViewType, EntityViewType } from "../view-context/types";
import { useParams } from "next/navigation";
import SvgCubesOff from "../icons/CubesOff";
import SvgCodeOff from "../icons/CodeOff";
import SvgCodeOn from "../icons/CodeOn";
import SvgCubesOn from "../icons/CubesOn";

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
                value={option}
                className="h-[34px] w-[34px] p-[7px]"
              >
                {selectedView === option ? OnMap[option] : OffMap[option]}
              </ToggleGroup.Item>
            );
            if (index !== 0) {
              return (
                <>
                  <Separator.Root
                    key={index}
                    className="mx-1 h-5 w-px bg-slate-200"
                    decorative
                    orientation="vertical"
                  />
                  {toggleGroup}
                </>
              );
            }
            return toggleGroup;
          },
        )}
      </ToggleGroup.Root>
    </div>
  );
}
