"use client";

import { Entity } from "@modularcloud/ecs";
import { useContext } from "react";
import { PageArchetype } from "../../ecs/archetypes/page";
import { ViewContext } from "../view-context/client";
import Overview from "./overview";
import { Raw } from "./raw";

type Props = {
  entity: Entity<typeof PageArchetype>;
};

export function ClientEntity({ entity }: Props) {
  const view = useContext(ViewContext);
  switch (view.entity) {
    case "overview":
      return <Overview entity={entity} />;
    case "raw":
      return <Raw entity={entity} />;
    default:
      return null;
  }
}
