import { AssociatedArchetype } from "../../ecs/archetypes/associated";
import { asyncUseEntity } from "../../ecs/hooks/use-entity/server";
import { TableRow } from "./component";
import { TableRowProps } from "./interface";

export async function ServerTableRow({ row, name, header }: TableRowProps) {
  const entity = await asyncUseEntity({
    resourcePath: row,
    archetype: AssociatedArchetype,
  });
  if (!entity) return null;

  return <TableRow entity={entity} name={name} header={header} />;
}
