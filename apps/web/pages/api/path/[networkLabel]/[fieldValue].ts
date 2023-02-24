import {
  NextApiRequest,
  NextApiResponse,
} from 'next';
import { getEntity } from 'service-manager/types/network.type';

import {
  isAddress,
  isHash,
  isHeight,
} from '../../../../lib/search';
import { ServiceManager } from '../../../../lib/service-manager';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { networkLabel, fieldValue } = req.query;
    if (typeof networkLabel !== "string") {
        return res.status(404).end();
    }
    if (typeof fieldValue !== "string") {
        return res.status(404).end()
    }


    const network = ServiceManager.getNetwork(networkLabel);
    if (!network) {
        return res.status(404).end();
    }

    // Try address
    if(isAddress(fieldValue)) {
        const account = await getEntity(network, "account", "address", fieldValue);
        if (account) {
            res.json({
                path: `/${networkLabel}/account/address/${fieldValue}`,
            })
            return res.status(200).end();
        }
    }

    // Try height
    if (isHeight(fieldValue)) {
        const block = await getEntity(network, "block", "height", fieldValue);
        if (block) {
            res.json({
                path: `/${networkLabel}/block/height/${fieldValue}`,
            })
            return res.status(200).end();
        }
    }

    // Try hash
    if (isHash(fieldValue)) {
        // Try tx
        const transaction = await getEntity(network, "transaction", "hash", fieldValue);
        if (transaction) {
            res.json({
                path: `/${networkLabel}/transaction/hash/${fieldValue}`,
            });
            return res.status(200).end();

        }

        // Try block
        const block = await getEntity(network, "block", "hash", fieldValue);
        if (block) {
            res.json({
                path: `/${networkLabel}/block/hash/${fieldValue}`,
            })
            return res.status(200).end();
        }
    }

    // No luck
    res.status(404).end();
}
