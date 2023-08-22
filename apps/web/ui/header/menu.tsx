import { MobileActions } from "~/ui/mobile-actions";
import { PageArchetype } from "~/ecs/archetypes/page";
import { asyncUseEntity } from "~/ecs/hooks/use-entity/server";
import { FetchLoadArgs, getWhitelabel } from "~/lib/utils";
import { AssociatedRightPanel } from "~/ui/right-panel/associated";
import { ViewSwitcher } from "~/ui/view-switcher";

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
    <div className="flex items-center gap-6">
      <ViewSwitcher />
      <MobileActions searchOptions={whitelabel.searchOptions}>
        <AssociatedRightPanel
          resourcePath={resourcePath}
          className="flex lg:hidden"
        />
      </MobileActions>
    </div>
  );
}
