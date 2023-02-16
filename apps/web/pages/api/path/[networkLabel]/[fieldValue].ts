import type { NextRequest } from 'next/server'
import { getEntity } from 'service-manager/types/network.type';
import { isHash, isHeight } from '../../../../lib/search';
import { ServiceManager } from '../../../../lib/service-manager';

export const config = {
  runtime: 'edge',
}

export default async function handler(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const networkLabel = searchParams.get("networkLabel") ?? ""
    const fieldValue = searchParams.get("fieldValue") ?? ""
    const network = ServiceManager.getNetwork(networkLabel);
    if(!network) {
        return new Response(null, {status: 404});
    }

    // Try height
    if(isHeight(fieldValue)) {
        const block = await getEntity(network, "block", "height", fieldValue);
        if (block) {
            return new Response(
                JSON.stringify({
                  path: `/${networkLabel}/block/height/${fieldValue}`,
                }),
                {
                  status: 200,
                  headers: {
                    'content-type': 'application/json',
                    'cache-control': 'public, s-maxage=1200, stale-while-revalidate=600',
                  },
                }
            )        
        }
    }

    // Try hash
    if(isHash(fieldValue)) {
        // Try tx
        const transaction = await getEntity(network, "transaction", "hash", fieldValue);
        if (transaction) {
            return new Response(
                JSON.stringify({
                  path: `/${networkLabel}/transaction/hash/${fieldValue}`,
                }),
                {
                  status: 200,
                  headers: {
                    'content-type': 'application/json',
                    'cache-control': 'public, s-maxage=1200, stale-while-revalidate=600',
                  },
                }
            )   
        }

        // Try block
        const block = await getEntity(network, "block", "hash", fieldValue);
        if (block) {
            return new Response(
                JSON.stringify({
                  path: `/${networkLabel}/block/hash/${fieldValue}`,
                }),
                {
                  status: 200,
                  headers: {
                    'content-type': 'application/json',
                    'cache-control': 'public, s-maxage=1200, stale-while-revalidate=600',
                  },
                }
            )   
        }
    }

    // No luck
    return new Response(null, {status: 404});
}
