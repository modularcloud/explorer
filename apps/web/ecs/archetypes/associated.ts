import { createArchetype } from "@modularcloud/ecs";
import { CardComponent } from "../components/card";
import { RowComponent } from "../components/row";

export const AssociatedArchetype = createArchetype()
  .addComponent(CardComponent)
  .addComponent(RowComponent)
  .finish();
