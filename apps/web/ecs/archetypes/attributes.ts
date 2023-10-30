import { createArchetype } from "@modularcloud/ecs";
import { AttributesComponent } from "~/ecs/components/attributes";

export const AttributesArchetype = createArchetype()
  .addComponent(AttributesComponent)
  .finish();
