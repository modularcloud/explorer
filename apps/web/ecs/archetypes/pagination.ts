import { createArchetype } from "@modularcloud/ecs";
import { PaginationComponent } from "../components/pagination";

export const PaginationArchetype = createArchetype()
  .addComponent(PaginationComponent)
  .finish();
