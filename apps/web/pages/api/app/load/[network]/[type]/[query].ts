import { Engine } from "@modularcloud/ecs";
import { NextApiRequest, NextApiResponse } from "next";
import { CreateEVMConfig } from "../../../../../../integrations/evm";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const config = CreateEVMConfig({
    endpoint: "https://api.evm.zebec.eclipsenetwork.xyz/solana",
    network: {
      id: "triton",
      displayName: "Triton",
      logoUrl:
        "https://ethereum.org/static/1b1d1b8e1f8d9b6e1c6d8f1b8f1b1b1c/6b2b1/eth-logo.png",
    },
  });
  Engine.addConfig("triton", config);
  try {
    if (req.query.type === "search") {
      const types = Object.keys(config.loaders);
      const result = await Promise.any(
        types.map(async (type) => {
          return Engine.load({
            ...req.query,
            type,
          } as any);
        })
      );
      res.json(result);
    } else {
      const result = await Engine.load(req.query as any);
      res.json(result);
    }
  } catch (e) {
    console.error(e);
    res.status(404).end();
  }
}
