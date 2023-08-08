import { NextApiRequest, NextApiResponse } from "next";
import { slugify } from "service-manager";
import { getEntity } from "service-manager/types/network.type";
import {
  isAddress,
  isHash,
  isHeight,
  isSignature,
} from "../../../../lib/search";
import { getSearchOptions } from "../../../../lib/search-options";
import {
  loadDynamicNetworks,
  ServiceManager,
} from "../../../../lib/service-manager";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { networkLabel, fieldValue } = req.query;
  if (typeof networkLabel !== "string") {
    return res.status(404).end();
  }
  if (typeof fieldValue !== "string") {
    return res.status(404).end();
  }

  const searchOptions = await getSearchOptions();
  const defaultNetworkLabel: string = searchOptions[0].options[0].name;
  const useShortPath = slugify(defaultNetworkLabel) === slugify(networkLabel);

  await loadDynamicNetworks();
  const network = ServiceManager.getNetwork(networkLabel);
  if (!network) {
    return res.status(404).end();
  }

  // Try signature
  if (isSignature(fieldValue)) {
    // Try transaction
    const transaction = await getEntity(
      network,
      "transaction",
      "signature",
      fieldValue,
    );
    if (transaction) {
      res.json({
        path: `/${networkLabel}/transaction/signature/${fieldValue}`,
      });
      return res.status(200).end();
    }

    // Try svm transaction
    const svmTransaction = await getEntity(
      network,
      "svm-transaction",
      "signature",
      fieldValue,
    );
    if (svmTransaction) {
      res.json({
        path: `/${networkLabel}/svm-transaction/signature/${fieldValue}`,
      });
      return res.status(200).end();
    }
  }

  // Try address
  if (isAddress(fieldValue)) {
    // Try token
    const token = await getEntity(network, "token", "address", fieldValue);
    if (token) {
      res.json({
        path: useShortPath
          ? `/token/${fieldValue}`
          : `/${networkLabel}/token/address/${fieldValue}`,
      });
      return res.status(200).end();
    }

    // Try account
    const account = await getEntity(network, "account", "address", fieldValue);
    if (account) {
      res.json({
        path: useShortPath
          ? `/address/${fieldValue}`
          : `/${networkLabel}/account/address/${fieldValue}`,
      });
      return res.status(200).end();
    }
  }

  // Try height
  if (isHeight(fieldValue)) {
    // Try height
    const hBlock = await getEntity(network, "block", "height", fieldValue);
    if (hBlock) {
      res.json({
        path: useShortPath
          ? `/block/${fieldValue}`
          : `/${networkLabel}/block/height/${fieldValue}`,
      });
      return res.status(200).end();
    }

    // Try height - with evm
    const heBlock = await getEntity(network, "evm-block", "height", fieldValue);
    if (heBlock) {
      res.json({
        path: `/${networkLabel}/evm-block/height/${fieldValue}`,
      });
      return res.status(200).end();
    }

    // Try slot
    const sBlock = await getEntity(network, "block", "slot", fieldValue);
    if (sBlock) {
      res.json({
        path: `/${networkLabel}/block/slot/${fieldValue}`,
      });
      return res.status(200).end();
    }

    // Try slot - with svm
    const ssBlock = await getEntity(network, "svm-block", "slot", fieldValue);
    if (ssBlock) {
      res.json({
        path: `/${networkLabel}/svm-block/slot/${fieldValue}`,
      });
      return res.status(200).end();
    }
  }

  // Try hash
  if (isHash(fieldValue)) {
    // Try tx
    const transaction = await getEntity(
      network,
      "transaction",
      "hash",
      fieldValue,
    );
    if (transaction) {
      res.json({
        path: useShortPath
          ? `/tx/${fieldValue}`
          : `/${networkLabel}/transaction/hash/${fieldValue}`,
      });
      return res.status(200).end();
    }

    // Try block
    const block = await getEntity(network, "block", "hash", fieldValue);
    if (block) {
      res.json({
        path: useShortPath
          ? `/block/${fieldValue}`
          : `/${networkLabel}/block/hash/${fieldValue}`,
      });
      return res.status(200).end();
    }
  }

  // No luck
  res.status(404).end();
}
