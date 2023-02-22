import { NextApiRequest, NextApiResponse } from 'next';
import { RemoteServiceRequestSchema, ServiceManager } from '../../lib/service-manager';

const ADD_NETWORK_PASS = process.env.ADD_NETWORK_PASS;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { pass, ...request } = req.body;

        if(!ADD_NETWORK_PASS) {
            return res.status(500).end();
        }
        
        if(req.body.pass !== ADD_NETWORK_PASS) {
            return res.status(403).end();
        }

        const network = RemoteServiceRequestSchema.parse(request);
        // fetch(api, network);
        ServiceManager.addNetwork
    } catch {
        return res.status(400).end();
    }
}
