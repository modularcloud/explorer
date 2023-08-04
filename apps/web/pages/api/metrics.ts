import { getWhitelabel } from "lib/utils";
import { NextApiRequest, NextApiResponse } from "next";

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
  return res.json(
    await fetch(
      process.env.METRICS_API_URL + "/" + getWhitelabel().defaultNetwork ===
        "nautilus"
        ? "eclipse/91002"
        : /* proteus */ "ep/6" + "/real-time-metrics",
    ).then((response) => response.json()),
  );
};

module.exports = allowCors(handler);
