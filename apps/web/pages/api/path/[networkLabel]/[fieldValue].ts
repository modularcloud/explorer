import { NextApiRequest, NextApiResponse } from 'next';
import { getEntity } from 'service-manager/types/network.type';
import { isHash, isHeight } from '../../../../lib/search';
import { ServiceManager } from '../../../../lib/service-manager';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { networkLabel, fieldValue } = req.query;
    if (typeof networkLabel !== "string") {
        return res.status(404)
    }
    if (typeof fieldValue !== "string") {
        return res.status(404)
    }
    const network = ServiceManager.getNetwork(networkLabel);
    if (!network) {
        return res.status(404);
    }

    // Try height
    if (isHeight(fieldValue)) {
        const block = await getEntity(network, "block", "height", fieldValue);
        if (block) {
            return res.json({
                path: `/${networkLabel}/block/height/${fieldValue}`,
            })
        }
    }

    // Try hash
    if (isHash(fieldValue)) {
        // Try tx
        const transaction = await getEntity(network, "transaction", "hash", fieldValue);
        if (transaction) {
            return res.json({
                path: `/${networkLabel}/transaction/hash/${fieldValue}`,
            });
        }

        // Try block
        const block = await getEntity(network, "block", "hash", fieldValue);
        if (block) {
            return res.json({
                path: `/${networkLabel}/block/hash/${fieldValue}`,
            })
        }
    }

    // No luck
    else res.status(404);
}
