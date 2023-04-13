"use client";

import { useContext } from "react";
import { AssociatedViewContext } from "../context";
import { FeedList } from "./feed";
import { TableList } from "./table";

export interface Props {
  children: React.ReactNode;
  tableLabel: string;
}

export function AssociatedList({ children, tableLabel }: Props) {
  const view = useContext(AssociatedViewContext);
  switch (view) {
    case "feed":
      return <FeedList>{children}</FeedList>;
    case "table":
      return <TableList label={tableLabel}>{children}</TableList>;
    default:
      return null;
  }
}
