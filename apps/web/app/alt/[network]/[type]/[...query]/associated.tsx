import { PageArchetype } from "../../../../../ecs/archetypes/page";
import { useEntity } from "../../../../../ecs/hooks/use-entity";

type Props = {
  resourcePath: any;
};

export default async function Associated({ resourcePath }: Props) {
  const entity = await useEntity({
    resourcePath,
    archetype: PageArchetype,
  });
  if (!entity) return null;
  const associated = entity.components.associated.data;
  const groups = Object.keys(associated);

  return groups.map((group) => {
    const items = associated[group];
    return (
      <div key={group}>
        <h2>{group}</h2>
        {items.map((item) => {
          const path = item.query.join("/");
          return <div key={path}>{path}</div>;
        })}
      </div>
    );
  });
}
