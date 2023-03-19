import { createArchetype } from "@modularcloud/ecs";
import { AssociatedComponent } from "../components/associated";
import { SidebarComponent } from "../components/sidebar";
import { TopbarComponent } from "../components/topbar";

export const PageArchetype = createArchetype()
    .addComponent(SidebarComponent)
    .addComponent(TopbarComponent)
    .addComponent(AssociatedComponent)
    .finish();