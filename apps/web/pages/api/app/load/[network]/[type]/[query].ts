import { Engine, verifyArchetype } from "@modularcloud/ecs";
import { NextApiRequest, NextApiResponse } from "next";
import { PageArchetype } from "../../../../../../ecs/archetypes/page";
import { getEngine } from "../../../../../../lib/networks";

const allowCors =
  (fn: any) => async (req: NextApiRequest, res: NextApiResponse) => {
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Origin", "*");
    // another common pattern
    // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET,OPTIONS,PATCH,DELETE,POST,PUT",
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
    );
    if (req.method === "OPTIONS") {
      res.status(200).end();
      return;
    }
    return await fn(req, res);
  };

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { config, Engine } = getEngine();
  try {
    // temporarily add address/token as search types until we can implement redirections
    if (
      req.query.type === "search" ||
      req.query.type === "account" ||
      req.query.type === "token"
    ) {
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
            p.then((entity) => verifyArchetype(PageArchetype, entity)),
          ),
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
};

module.exports = allowCors(handler);
