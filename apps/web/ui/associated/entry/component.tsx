"use client";

import { AssociatedArchetype } from "../../../ecs/archetypes/associated";
import { Entity } from "@modularcloud/ecs";
import { useContext } from "react";
import { ViewContext } from "../../view-context/client";
import { FeedEntry } from "./feed/feed";
import { TableEntry } from "./table";

export interface Props {
  entity: Entity<typeof AssociatedArchetype>;
}

export function AssociatedEntry({ entity }: Props) {
  const view = useContext(ViewContext);
  switch (view.associated) {
    case "feed":
      return <FeedEntry entity={entity} />;
    case "table":
      return <TableEntry entity={entity} />;
    default:
      return null;
  }
}
