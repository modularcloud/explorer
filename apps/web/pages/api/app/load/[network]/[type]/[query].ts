import { Engine, verifyArchetype } from "@modularcloud/ecs";
import { NextApiRequest, NextApiResponse } from "next";
import { PageArchetype } from "../../../../../../ecs/archetypes/page";
import { getEngine } from "../../../../../../lib/networks";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { config, Engine } = getEngine();
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
