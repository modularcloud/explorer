import { TokenListProvider } from '@solana/spl-token-registry';
import {
  NextApiRequest,
  NextApiResponse,
} from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { networkLabel, fieldValue } = req.query;

    new TokenListProvider().resolve().then(tokens => {
      const tokenList = tokens.filterByClusterSlug("mainnet-beta").getList();
      const returnToken = tokenList.find(token => token.address === fieldValue);

      if (returnToken) {
        res.status(200).json({ token: returnToken })
      } else {
        res.status(400).json({ error: "SOL token not found" })
      }
    }).catch(e => {
      res.status(404).json({ error: e })
    })
}