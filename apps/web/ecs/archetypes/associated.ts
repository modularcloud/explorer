import { createArchetype } from "ecs";
import { CardComponent } from "~/ecs/components/card";
import { RowComponent } from "~/ecs/components/row";

export const AssociatedArchetype = createArchetype()
  .addComponent(CardComponent)
  .addComponent(RowComponent)
  .finish();
