import { NextApiRequest, NextApiResponse } from "next";

const ADD_NETWORK_PASS = process.env.ADD_NETWORK_PASS;
const ADD_NETWORK_ENDPOINT = process.env.ADD_NETWORK_ENDPOINT;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { provider, id } = req.query;
  const { authorization } = req.headers;
  if (!ADD_NETWORK_PASS || !ADD_NETWORK_ENDPOINT) {
    return res.status(500).end();
  }

  if (req.method !== "DELETE") {
    return res.status(400).end();
  }

  if (authorization !== ADD_NETWORK_PASS) {
    return res.status(403).end();
  }

  const response = await fetch(
    `${ADD_NETWORK_ENDPOINT}/chain-config/${provider}/${id}`,
    {
      method: "DELETE",
    },
  );

  if (response.ok) {
    // delete from live version
  }
  return res.status(response.status).end();
}
