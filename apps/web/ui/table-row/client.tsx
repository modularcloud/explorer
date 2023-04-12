"use client";

import { AssociatedArchetype } from "../../ecs/archetypes/associated";
import { useEntity } from "../../ecs/hooks/use-entity";
import { TableRow } from "./component";
import { TableRowProps } from "./interface";

export function ClientTableRow({ row, name, header }: TableRowProps) {
  const response = useEntity({
    resourcePath: row,
    archetype: AssociatedArchetype,
  });
  const entity = response.data;
  if (!entity) return null;

  return <TableRow entity={entity} name={name} header={header} />;
}
