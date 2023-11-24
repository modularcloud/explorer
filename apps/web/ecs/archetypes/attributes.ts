import { createArchetype } from "ecs";
import { AttributesComponent } from "~/ecs/components/attributes";

export const AttributesArchetype = createArchetype()
  .addComponent(AttributesComponent)
  .finish();
