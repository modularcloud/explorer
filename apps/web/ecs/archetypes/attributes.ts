import { createArchetype } from "@modularcloud/ecs";
import { AttributesComponent } from "../components/attributes";

export const AttributesArchetype = createArchetype()
  .addComponent(AttributesComponent)
  .finish();
