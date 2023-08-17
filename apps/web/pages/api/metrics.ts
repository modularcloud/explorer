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

  let path: string;
    
  switch(getWhitelabel().defaultNetwork) {
    case "mainnet": // nautilus mainnet
      path = "v2/1";
      break;
    case "triton":
      path = "eclipse/91002";
      break;
    case "proteus":
      path = "ep/6";
      break;
    default:
      path = "ep/6";
      break
  }
  
  return res.json(
    await fetch(
      process.env.METRICS_API_URL + "/" + path + "/real-time-metrics",
    ).then((response) => response.json()),
  );
};

module.exports = allowCors(handler);
