"use client";

import { useContext } from "react";
import { AssociatedViewContext } from "../context/client";
import { FeedList } from "./feed";
import { TableList } from "./table/table";

export interface Props {
  label: string;
  children: React.ReactNode;
  tableHeader: React.ReactNode;
}

// TODO use memo so that table header does not re-render
export function AssociatedList({ label, children, tableHeader }: Props) {
  const view = useContext(AssociatedViewContext);
  switch (view) {
    case "feed":
      return <FeedList>{children}</FeedList>;
    case "table":
      return (
        <TableList header={tableHeader} label={label}>
          {children}
        </TableList>
      );
    default:
      return null;
  }
}
