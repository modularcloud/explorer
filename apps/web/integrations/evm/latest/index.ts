import { createLoader, EngineConfigMetadata } from "@modularcloud/ecs";
import { createModularCloud } from "@modularcloud/sdk";
import { z } from "zod";
import { AssociatedTransform } from "./associated";
import { PageTransform } from "./page";
import { RawTransform } from "./raw";
import { SidebarTransform } from "./sidebar";
import { TopbarTransform } from "./topbar";

export async function LatestExtract(
  _q: unknown,
  metadata: EngineConfigMetadata,
) {
  const type = z.enum(["transactions", "blocks"]).parse(_q);
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
  .addTransform(RawTransform)
  .finish();
