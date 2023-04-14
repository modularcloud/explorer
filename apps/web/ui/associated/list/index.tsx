"use client";

import { useContext } from "react";
import { FetchLoadArgs } from "../../../lib/utils";
import { AssociatedViewContext } from "../context";
import { FeedList } from "./feed";
import { TableList } from "./table/table";

export interface Props {
  children: React.ReactNode;
  tableLabel: string;
  initialValues: FetchLoadArgs[];
}

// TODO use memo so that table header does not re-render
export function AssociatedList({ children, tableLabel, initialValues }: Props) {
  const view = useContext(AssociatedViewContext);
  switch (view) {
    case "feed":
      return <FeedList>{children}</FeedList>;
    case "table":
      return <TableList initialValues={initialValues} label={tableLabel}>{children}</TableList>;
    default:
      return null;
  }
}
