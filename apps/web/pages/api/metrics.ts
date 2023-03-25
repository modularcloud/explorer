import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
    return res.json(await fetch(process.env.METRICS_API_URL ?? "").then((response) => response.json()));
  }