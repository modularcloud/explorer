import { NextApiRequest, NextApiResponse } from "next";
import { loadDynamicNetworks, ServiceManager } from "../../lib/service-manager";
import { getAssociated } from "service-manager/types/network.type";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const entity = JSON.parse(req.body);
    const entityTypeName = entity.context?.entityTypeName;
    const networkLabel = entity.context?.network;
    if (
      typeof entityTypeName !== "string" ||
      typeof networkLabel !== "string"
    ) {
      return res.status(400).end();
    }

    await loadDynamicNetworks();
    const network = ServiceManager.getNetwork(networkLabel);
    if (!network) {
      return res.status(404).end();
    }

    res.json(await getAssociated(network, entity));
    res.status(200).end();
  } catch {
    res.status(500).end();
  }
}
