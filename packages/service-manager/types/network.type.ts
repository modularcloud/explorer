import { Entity } from "./entity.type";

type EntityType = {
  name: string;
  getByField: { [field: string]: (field: string) => Promise<Entity | null> };
};

export type Network = {
  label: string;
  entityTypes: EntityType[];
};

export function getEntityTypeNames(network: Network): string[] {
  return network.entityTypes.map((entityType) => entityType.name);
}

export async function getEntity(
  network: Network,
  typeName: string,
  field: string,
  fieldValue: string
): Promise<Entity | null> {
  const entityType = network.entityTypes.find(
    (entityType) => (entityType.name = typeName)
  );
  if (!entityType) {
    return null;
  }

  const getter = entityType.getByField[field];
  if (!getter) {
    return null;
  }

  return getter(fieldValue);
}
