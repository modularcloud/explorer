import { NextApiRequest, NextApiResponse } from "next";
import { slugify } from "service-manager/utils/slugify";
import {
  addRemote,
  RemoteServiceRequestSchema,
} from "../../../lib/service-manager";

const ADD_NETWORK_PASS = process.env.ADD_NETWORK_PASS;
const ADD_NETWORK_ENDPOINT = process.env.ADD_NETWORK_ENDPOINT;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (!ADD_NETWORK_PASS || !ADD_NETWORK_ENDPOINT) {
    return res.status(500).end();
  }
  try {
    if (req.method === "POST") {
      const { authorization } = req.headers;
      if (authorization !== ADD_NETWORK_PASS) {
        return res.status(403).end();
      }

      const parsed = JSON.parse(req.body);

      const network = RemoteServiceRequestSchema.parse({
        id: slugify(parsed.name),
        ...parsed,
      });

      const response = await fetch(ADD_NETWORK_ENDPOINT + "/chain-config", {
        method: "POST",
        body: JSON.stringify(network),
      });

      if (response.ok) {
        addRemote(network);
      }
      return res.status(response.status).end();
    } else if (req.method === "GET") {
      const response = await fetch(ADD_NETWORK_ENDPOINT + "/chain-config");

      if (response.ok) {
        res.json(await response.json());
      }

      return res.status(response.status).end();
    } else {
      return res.status(400).end();
    }
  } catch (e) {
    console.log(e);
    return res.status(400).end();
  }
}
