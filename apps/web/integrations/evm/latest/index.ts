import { createLoader, EngineConfigMetadata } from "@modularcloud/ecs";
import { createModularCloud } from "@modularcloud/sdk";
import { z } from "zod";
import { AssociatedTransform } from "./associated";
import { PageTransform } from "./page";
import { SidebarTransform } from "./sidebar";
import { TopbarTransform } from "./topbar";

export async function LatestExtract(
  _q: unknown,
  metadata: EngineConfigMetadata
) {
  const type = z.string().parse(_q);
  if (type !== "transactions") {
    // TODO: Add support for other types like blocks
    throw new Error("Invalid type");
  }

  return {
    type,
  };
}

export const LatestLoader = createLoader()
  .addExtract(LatestExtract)
  .addTransform(TopbarTransform)
  .addTransform(SidebarTransform)
  .addTransform(AssociatedTransform)
  .addTransform(PageTransform)
  .finish();
