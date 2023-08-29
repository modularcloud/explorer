import { createArchetype } from "@modularcloud/ecs";
import { AssociatedComponent } from "~/ecs/components/associated";
import { PageComponent } from "~/ecs/components/page";
import { RawComponent } from "~/ecs/components/raw";
import { SidebarComponent } from "~/ecs/components/sidebar";
import { TopbarComponent } from "~/ecs/components/topbar";

export const PageArchetype = createArchetype()
  .addComponent(SidebarComponent)
  .addComponent(TopbarComponent)
  .addComponent(AssociatedComponent)
  .addComponent(PageComponent)
  .addComponent(RawComponent)
  .finish();
