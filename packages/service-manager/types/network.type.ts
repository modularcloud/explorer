import { slugify } from "../utils/slugify";
import { Entity } from "./entity.type";

type GetOneFn = (query: string) => Promise<Entity | null>;
type GetManyFn = (query: string) => Promise<Entity[]>;

type EntityType = {
  name: string;
  getters: { field: string; getOne?: GetOneFn; getMany?: GetManyFn }[];
  getAssociated:
    | ((entity: Entity) => Promise<Entity[]>)
    | ((entity: Entity) => Promise<Record<string, Entity[]>>);
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
  fieldValue: string,
): Promise<Entity | null> {
  const entityType = network.entityTypes.find(
    (entityType) => slugify(entityType.name) === slugify(typeName),
  );
  if (!entityType) {
    return null;
  }

  const getter = entityType.getters
    .filter((getter) => getter.getOne)
    .find((getter) => slugify(getter.field) === slugify(field));
  if (!getter?.getOne) {
    return null;
  }

  return getter.getOne(fieldValue);
}

// temporary measure to unblock table development
export async function getEntities(
  network: Network,
  typeName: string,
  field: string,
  fieldValue: string,
): Promise<Entity[]> {
  const entityType = network.entityTypes.find(
    (entityType) => slugify(entityType.name) === slugify(typeName),
  );
  if (!entityType) {
    return [];
  }

  const getter = entityType.getters
    .filter((getter) => getter.getMany)
    .find((getter) => slugify(getter.field) === slugify(field));
  if (!getter?.getMany) {
    return [];
  }

  return getter.getMany(fieldValue);
}

export async function getAssociated(
  network: Network,
  entity: Entity,
): Promise<Entity[] | Record<string, Entity[]>> {
  const entityType = network.entityTypes.find(
    (entityType) =>
      slugify(entityType.name) === slugify(entity.context.entityTypeName),
  );
  if (!entityType) {
    return [];
  }

  return entityType.getAssociated(entity);
}
