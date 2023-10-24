import { createResolver, NotFound } from "@modularcloud-resolver/core";
import { FetchResolver } from "@modularcloud-resolver/fetch";

export const BlockHashResolver = createResolver(
  {
    id: "celestia-block-hash-0.0.0",
    cache: false, // all cache is disabled for now
  },
  async (input: { endpoint: string; hash: string }, fetchResolver) => {
    const match = input.hash.match(/^(?:0x)?([a-fA-F0-9]{64})$/);
    if (!match) {
      throw new Error("Invalid hash");
    }
    const hash = match[1];
    const response = await fetchResolver({
      url: `${input.endpoint}/block_by_hash?hash=0x${hash.toUpperCase()}`,
    });
    if (response.type === "success") return response.result;
    NotFound();
  },
  [FetchResolver],
);

export const BlockHeightResolver = createResolver(
  {
    id: "celestia-block-height-0.0.0",
    cache: false, // all cache is disabled for now
  },
  async (input: { endpoint: string; height: string }, fetchResolver) => {
    const response = await fetchResolver({
      url: `${input.endpoint}/block?height=${input.height}`,
    });
    if (response.type === "success") return response.result;
    if (!input.height.match(/^\d+$/)) {
      throw new Error("Invalid height");
    }
    NotFound();
  },
  [FetchResolver],
);

export const TransactionResolver = createResolver(
  {
    id: "celestia-transaction-0.0.0",
    cache: false, // all cache is disabled for now
  },
  async (input: { endpoint: string; hash: string }, fetchResolver) => {
    const match = input.hash.match(/^(?:0x)?([a-fA-F0-9]{64})$/);
    if (!match) {
      throw new Error("Invalid hash");
    }
    const hash = match[1];
    const response = await fetchResolver({
      url: `${input.endpoint}/tx?hash=0x${hash.toUpperCase()}&prove=false`,
    });
    if (response.type === "success") return response.result;
    NotFound();
  },
  [FetchResolver],
);


const publicRPCMap = {
    "3": "http://consensus-full-arabica-9.celestia-arabica.com:26657",
    "4": "https://rpc-mocha.pops.one",
    "5": "http://consensus-validator.celestia-arabica-10.com:26657"
};


// export const BalanceResolver = createResolver({
//     id: "celestia-balance-0.0.0",
//     cache: false
// }, async (input: { address: string; network: string }, fetchResolver) => {
    
// }, [FetchResolver]);