import { MobileActions } from "../../app/[network]/[type]/(standard)/[query]/[[...viewPath]]/(components)/mobile-actions";
import { PageArchetype } from "../../ecs/archetypes/page";
import { asyncUseEntity } from "../../ecs/hooks/use-entity/server";
import { FetchLoadArgs, getWhitelabel } from "../../lib/utils";
import { RightPanel } from "../right-panel";
import { ViewSwitcher } from "../view-switcher";

type Props = {
  resourcePath: FetchLoadArgs;
};
export async function HeaderMenu({ resourcePath }: Props) {
  const whitelabel = getWhitelabel();

  // we don't want to display this if it's null
  const entity = await asyncUseEntity({
    resourcePath,
    archetype: PageArchetype,
  });
  if (!entity)
    return (
      <MobileActions
        searchOptions={whitelabel.searchOptions}
        rightPanelDisabled={true}
      />
    );

  return (
    <div className="flex gap-6 items-center">
      <ViewSwitcher />
      <MobileActions searchOptions={whitelabel.searchOptions}>
        {/* @ts-expect-error Async Server Component */}
        <RightPanel resourcePath={resourcePath} className="flex lg:hidden" />
      </MobileActions>
    </div>
  );
}
