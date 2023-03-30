import { Engine } from "@modularcloud/ecs";
import { NextApiRequest, NextApiResponse } from "next";
import { CreateEVMConfig } from "../../../../../../integrations/evm";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const config = CreateEVMConfig({
    endpoint: process.env.ETHEREUM_RPC ?? "",
    network: {
      id: "ethereum",
      displayName: "Ethereum",
      logoUrl:
        "https://ethereum.org/static/1b1d1b8e1f8d9b6e1c6d8f1b8f1b1b1c/6b2b1/eth-logo.png",
    },
  });
  Engine.addConfig("ethereum", config);
  try {
    const result = await Engine.load(req.query as any);
    res.json(result);
  } catch(e) {
    console.error(e);
    res.status(404).end();
  }
}