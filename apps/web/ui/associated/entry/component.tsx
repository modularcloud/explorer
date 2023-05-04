"use client";

import { AssociatedArchetype } from "../../../ecs/archetypes/associated";
import { Entity } from "@modularcloud/ecs";
import { useContext } from "react";
import { AssociatedViewContext } from "../context/client";
import { FeedEntry } from "./feed/feed";
import { TableEntry } from "./table";

export interface Props {
  entity: Entity<typeof AssociatedArchetype>;
}

export function AssociatedEntry({ entity }: Props) {
  const view = useContext(AssociatedViewContext);
  switch (view) {
    case "feed":
      return <FeedEntry entity={entity} />;
    case "table":
      return <TableEntry entity={entity} />;
    default:
      return null;
  }
}
