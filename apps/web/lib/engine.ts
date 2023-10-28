import { Engine, EngineConfig } from "@modularcloud/ecs";
import { CreateCosmosConfig } from "~/integrations/cosmos";
import { CreateEVMConfig } from "~/integrations/evm";
import { getSingleNetworkCached } from "./network";

export async function getEngine(networkSlug: string) {
  let config: EngineConfig | null = null;
  const integration = await getSingleNetworkCached(networkSlug);
  if (!integration) return null;

  let primary: EngineConfig | null = null;
  let secondary: EngineConfig | null = null;
  if (integration.config.rpcUrls.evm) {
    config = primary = CreateEVMConfig({
      endpoint: integration.config.rpcUrls.evm,
      network: {
        id: integration.internalId,
        displayName: integration.chainName,
        nativeToken: integration.config.token.name,
        logoUrl: integration.config.logoUrl,
      },
    });
  }
  if (integration.config.rpcUrls.cosmos) {
    config = secondary = CreateCosmosConfig({
      endpoint: integration.config.rpcUrls.cosmos,
      network: {
        id: integration.internalId,
        displayName: integration.chainName,
        nativeToken: integration.config.token.name,
        logoUrl: integration.config.logoUrl,
      },
    });
  }

  if (primary && secondary) {
    Engine.addConfig(integration.slug, {
      primary,
      secondary,
      conflicts: ["block"],
    });
  } else if (primary) {
    Engine.addConfig(integration.slug, primary);
  } else if (secondary) {
    Engine.addConfig(integration.slug, secondary);
  } else {
    return null;
  }

  return {
    Engine,
    // Normally This will be always defined when used
    // this is just to silence typescript
    config: config ?? ({} as EngineConfig),
  };
}
