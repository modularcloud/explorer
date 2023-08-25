import { createLoader, EngineConfigMetadata } from "@modularcloud/ecs";
import { createModularCloud } from "@modularcloud/sdk";
import { z } from "zod";
import { AssociatedTransform } from "./associated";
import { PageTransform } from "./page";
import { RawTransform } from "./raw";
import { SidebarTransform } from "./sidebar";
import { TopbarTransform } from "./topbar";

export async function TokenExtract(
  _q: unknown,
  metadata: EngineConfigMetadata,
) {
  const address = z.string().parse(_q);
  const mc = createModularCloud(process.env.EVM_CHAIN_DATA_SERVICE);
  const token = await mc.evm.getTokenByAddress(metadata.network.id, address);
  return {
    address,
    token,
  };
}

export const TokenLoader = createLoader()
  .addExtract(TokenExtract)
  .addTransform(TopbarTransform)
  .addTransform(SidebarTransform)
  .addTransform(AssociatedTransform)
  .addTransform(PageTransform)
  .addTransform(RawTransform)
  .finish();
