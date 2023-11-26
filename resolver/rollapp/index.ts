import { createResolver, NotFound, ResolutionResponse } from "@modularcloud-resolver/core";
import { FetchResolver } from "@modularcloud-resolver/fetch";
import { z } from "zod";
import { getMessages } from "./registry";
import { getBlobTx } from "./parse-tx";

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
  async (input: { endpoint: string; height?: string }, fetchResolver) => {
    const response: ResolutionResponse = await fetchResolver({
      url: input.height
        ? `${input.endpoint}/block?height=${input.height}`
        : `${input.endpoint}/block`,
    });
    if (response.type === "success") return response.result;
    if (input.height && !input.height.match(/^\d+$/)) {
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
    const tryHash = async (hash: string) => {
      const response = await fetchResolver({
        url: `${input.endpoint}/tx?hash=${hash}&prove=false`,
      });
      if (response.type !== "success") {
        throw new Error("Failed to fetch transaction");
      }
      if (response.type === "success" && response.result.error) {
        throw new Error(response.result.error);
      }
      return response.result;
    }
    return await Promise.any([
      tryHash("0x" + hash.toUpperCase()),
      tryHash(hash.toUpperCase()),
    ]);
  },
  [FetchResolver],
);

const publicRPCMap = {
  "3": "http://consensus-full-arabica-9.celestia-arabica.com:26657",
  "4": "https://rpc-mocha.pops.one",
  "5": "http://consensus-validator.celestia-arabica-10.com:26657",
};

// export const BalanceResolver = createResolver({
//     id: "celestia-balance-0.0.0",
//     cache: false
// }, async (input: { address: string; network: string }, fetchResolver) => {

// }, [FetchResolver]);

// Helpers
function fixCapsAndSpacing(camel: string): string {
  const letters = camel.split("");

  // Capitalize the first letter if needed
  letters[0] = letters[0].toUpperCase();

  // Add a space before capital latters (new words)
  const characters = letters.map((letter) =>
    letter === letter.toUpperCase() ? ` ${letter}` : letter,
  );

  return characters.join("").trim();
}

function getMessageDisplayName(typeUrl: string): string {
  // Get the part after Msg
  const parts = typeUrl.split("Msg");
  const name = parts[parts.length - 1];

  // If there was no Msg then we don't know how to find the name
  if (parts.length === 1) {
    return "Unknown";
  }

  // Add IBC prefix if needed and return (properly formatted)
  return (
    (typeUrl.indexOf("ibc") !== -1 ? "IBC " : "") + fixCapsAndSpacing(name)
  );
}

function convertMessageToKeyValue(message: any, prefix?: string) {
  const KV: Record<string, string> = {};
  Object.entries(message).forEach(([key, value]) => {
    const activeKey = prefix
      ? `${prefix} ${fixCapsAndSpacing(key)}`
      : fixCapsAndSpacing(key);
    if (Buffer.isBuffer(value)) {
      KV[fixCapsAndSpacing(key)] = value.toString("base64");
      return;
    }
    if (Array.isArray(value)) {
      KV[fixCapsAndSpacing(key)] = Object.values(
        convertMessageToKeyValue(value),
      ).join(", ");
    } else if (typeof value === "object") {
      try {
        const AmountSchema = z.object({
          amount: z.string(),
          denom: z.string(),
        });
        const amount = AmountSchema.parse(value);
        KV[fixCapsAndSpacing(key)] = `${amount.amount} ${amount.denom}`;
        return;
      } catch {}
      const subKV = convertMessageToKeyValue(value, prefix);
      Object.entries(subKV).forEach(([subKey, subValue]) => {
        KV[subKey] = subValue;
      });
    } else {
      KV[fixCapsAndSpacing(key)] = String(value);
    }
  });
  return KV;
}

export const helpers = {
  getMessages,
  getMessageDisplayName,
  convertMessageToKeyValue,
  getBlobTx,
};
