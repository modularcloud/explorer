import { Engine, EngineConfig, verifyArchetype } from "@modularcloud/ecs";
import { NextApiRequest, NextApiResponse } from "next";
import { PageArchetype } from "../../../../../../ecs/archetypes/page";
import { CreateEVMConfig } from "../../../../../../integrations/evm";
import { getWhitelabel } from "../../../../../../lib/utils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const whitelabel = getWhitelabel();
  let config: EngineConfig;
  if(whitelabel.env === "nautilus") {
    config = CreateEVMConfig({
      endpoint: "https://api.evm.zebec.eclipsenetwork.xyz/solana",
      network: {
        id: "triton",
        displayName: "Triton",
        logoUrl:
          "https://ethereum.org/static/1b1d1b8e1f8d9b6e1c6d8f1b8f1b1b1c/6b2b1/eth-logo.png",
      },
    });
    Engine.addConfig("triton", config);
  }
  else {
    config = CreateEVMConfig({
      endpoint: "https://assasinscreed-1681214356120807-1.jsonrpc.sp1.sagarpc.io ",
      network: {
        id: "saga",
        displayName: "Saga",
        logoUrl:
          "https://ethereum.org/static/1b1d1b8e1f8d9b6e1c6d8f1b8f1b1b1c/6b2b1/eth-logo.png",
      },
    });
    Engine.addConfig("saga", config);
  }
  try {
    if (req.query.type === "search") {
      const types = Object.keys(config.loaders);
      const result = await Promise.any(
        types
          .map(async (type) => {
            return Engine.load({
              ...req.query,
              type,
            } as any);
          })
          .map((p) =>
            p.then((entity) => verifyArchetype(PageArchetype, entity))
          )
      );
      res.json(result);
    } else {
      const result = await Engine.load(req.query as any);
      res.json(result);
    }
  } catch (e) {
    console.error("Error loading entity", req.query);
    console.error(e);
    res.status(404).end();
  }
}
