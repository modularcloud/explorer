import { PageArchetype } from "../../../ecs/archetypes/page";
import { asyncUseEntity } from "../../../ecs/hooks/use-entity/server";
import { FetchLoadArgs } from "../../../lib/utils";
import { DEFAULT_ASSOCIATED_VIEW } from "../constants";
import { ClientAssociatedViewContextProvider } from "./client";

type Props = {
  resourcePath: FetchLoadArgs;
  children: React.ReactNode;
};

export async function AssociatedViewContextProvider({
  resourcePath,
  children,
}: Props) {
  const entity = await asyncUseEntity({
    resourcePath,
    archetype: PageArchetype,
  });
  const value =
    entity?.components.page.data.defaultView ?? DEFAULT_ASSOCIATED_VIEW;
  return (
    <ClientAssociatedViewContextProvider value={value}>
      {children}
    </ClientAssociatedViewContextProvider>
  );
}
