import { createArchetype } from "ecs";
import { PaginationComponent } from "~/ecs/components/pagination";

export const PaginationArchetype = createArchetype()
  .addComponent(PaginationComponent)
  .finish();
