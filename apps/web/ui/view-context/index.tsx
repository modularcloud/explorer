import { PageArchetype } from "../../ecs/archetypes/page";
import { asyncUseEntity } from "../../ecs/hooks/use-entity/server";
import { FetchLoadArgs } from "../../lib/utils";
import { DEFAULT_ASSOCIATED_VIEW } from "./constants";
import { ClientViewContextProvider } from "./client";

type Props = {
  resourcePath: FetchLoadArgs;
  children: React.ReactNode;
};

export async function ViewContextProvider({ resourcePath, children }: Props) {
  const entity = await asyncUseEntity({
    resourcePath,
    archetype: PageArchetype,
  });
  let value =
    entity?.components.page.data.defaultView ?? DEFAULT_ASSOCIATED_VIEW;
  return (
    <ClientViewContextProvider defaultAssociatedValue={value}>
      {children}
    </ClientViewContextProvider>
  );
}
