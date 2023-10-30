import { createArchetype } from "@modularcloud/ecs";
import { PaginationComponent } from "~/ecs/components/pagination";

export const PaginationArchetype = createArchetype()
  .addComponent(PaginationComponent)
  .finish();
