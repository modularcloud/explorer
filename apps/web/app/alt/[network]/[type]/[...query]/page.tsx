import { PageArchetype } from "../../../../../ecs/archetypes/page";
import { useEntity } from "../../../../../ecs/hooks/use-entity";

export default async function HomePage(props: any) {
  const entity = await useEntity({
    resourcePath: props.params,
    archetype: PageArchetype,
  });
  console.log(entity);
  return <div>Home Page</div>;
}
