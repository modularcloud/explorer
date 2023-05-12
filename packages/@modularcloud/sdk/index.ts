import {
  Token,
  TokenSchema,
  EventResponse,
  TxResponse,
  EventResponseSchema,
  TxResponseSchema,
  HolderResponseSchema,
  HolderResponse,
  TokenBalanceResponseSchema,
  TokenBalanceResponse,
  NFTBalance,
  NFTBalanceSchema,
} from "./schemas";

declare global {
  var fetch: typeof import("undici").fetch;
}

export interface ModularCloud {
  evm: {
    getTokenBalancesByAddress: (
      networkId: string,
      address: string
    ) => Promise<TokenBalanceResponse>;
    // TODO: combine this with the above
    getNFTBalancesByAddress: (
      networkId: string,
      address: string,
      maxResults?: number,
      nextToken?: string
    ) => Promise<NFTBalance[]>;
    getEventsByTokenAddress: (
      networkId: string,
      address: string,
      maxResults?: number,
      nextToken?: string
    ) => Promise<EventResponse>;
    getEventsByAccountAddress: (
      networkId: string,
      address: string,
      maxResults?: number,
      nextToken?: string
    ) => Promise<EventResponse>;
    // TODO: combine this with the above
    getNFTEventsByAccountAddress: (
      networkId: string,
      address: string,
      maxResults?: number,
      nextToken?: string
    ) => Promise<EventResponse>;
    getTokenByAddress: (networkId: string, address: string) => Promise<Token>;
    getAccountBalancesByTokenAddress: (
      networkId: string,
      address: string,
      maxResults?: number,
      nextToken?: string
    ) => Promise<HolderResponse>;
    getTransactionsByAddress: (
      networkId: string,
      address: string,
      maxResults?: number,
      nextToken?: string
    ) => Promise<TxResponse>;
    getRecentTransactions: (
      networkId: string,
      maxResults?: number,
      nextToken?: string
    ) => Promise<TxResponse>;
  };
}

type APIResponse = {
  result: any;
};

const NETWORK_ID_MAP: Record<string, string> = {
  triton: "eclipse/91002",
  saga: "sg/1",
  worlds: "ep/3",
  "evm-rollapp": "dym/2",
  goerli: "clo/1",
  polygon: "clo/2",
};

function normalizeNetworkId(networkId: string) {
  return NETWORK_ID_MAP[networkId] || networkId;
}

export function createModularCloud(baseUrl?: string): ModularCloud {
  if (!baseUrl) {
    throw new Error("Base URL is required to initialize Modular Cloud.");
  }

  const instance: ModularCloud = {
    evm: {
      getTokenBalancesByAddress: async (networkId: string, address: string) => {
        const response = await fetch(
          `${baseUrl}/${normalizeNetworkId(
            networkId
          )}/token-balances/${address.toLowerCase()}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch token balances!");
        }

        const json = (await response.json()) as APIResponse;
        return TokenBalanceResponseSchema.parse(json.result);
      },
      getNFTBalancesByAddress: async (networkId: string, address: string) => {
        const response = await fetch(
          `${baseUrl}/${normalizeNetworkId(
            networkId
          )}/token-balances/${address.toLowerCase()}?tokenType=NFT`
        );

        if (!response.ok) {
          return [];
        }

        const json = (await response.json()) as APIResponse;
        if (!json.result || !json.result.balancesV2) {
          return [];
        }

        return json.result.balancesV2.map((balance: any) => {
          return NFTBalanceSchema.parse(balance);
        });
      },
      getEventsByTokenAddress: async (
        networkId: string,
        address: string,
        maxResults: number = 30,
        nextToken?: string
      ) => {
        const response = await fetch(
          `${baseUrl}/${normalizeNetworkId(
            networkId
          )}/token-events/${address.toLowerCase()}?maxResults=${maxResults}${
            nextToken ? `&nextToken=${nextToken}` : ""
          }`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch events");
        }

        const json = (await response.json()) as APIResponse;
        return EventResponseSchema.parse(json.result);
      },
      getEventsByAccountAddress: async (
        networkId: string,
        address: string,
        maxResults: number = 30,
        nextToken?: string
      ) => {
        const response = await fetch(
          `${baseUrl}/${normalizeNetworkId(
            networkId
          )}/account-events/${address.toLowerCase()}?maxResults=${maxResults}${
            nextToken ? `&nextToken=${nextToken}` : ""
          }`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch events");
        }

        const json = (await response.json()) as APIResponse;
        return EventResponseSchema.parse(json.result);
      },
      getNFTEventsByAccountAddress: async (
        networkId: string,
        address: string,
        maxResults: number = 30,
        nextToken?: string
      ) => {
        const response = await fetch(
          `${baseUrl}/${normalizeNetworkId(
            networkId
          )}/account-events/${address.toLowerCase()}?eventType=NFTTransfer&maxResults=${maxResults}${
            nextToken ? `&nextToken=${nextToken}` : ""
          }`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch events");
        }

        const json = (await response.json()) as APIResponse;
        return EventResponseSchema.parse(json.result);
      },
      getTokenByAddress: async (networkId: string, address: string) => {
        const response = await fetch(
          `${baseUrl}/${normalizeNetworkId(
            networkId
          )}/token/${address.toLowerCase()}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch token");
        }

        const json = (await response.json()) as APIResponse;
        return TokenSchema.parse(json.result.token);
      },
      getAccountBalancesByTokenAddress: async (
        networkId: string,
        address: string,
        maxResults: number = 30,
        nextToken?: string
      ) => {
        const response = await fetch(
          `${baseUrl}/${normalizeNetworkId(
            networkId
          )}/holder-balances/${address.toLowerCase()}?maxResults=${maxResults}${
            nextToken ? `&nextToken=${nextToken}` : ""
          }`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch token balances");
        }

        const json = (await response.json()) as APIResponse;
        return HolderResponseSchema.parse(json.result);
      },
      getTransactionsByAddress: async (
        networkId: string,
        address: string,
        maxResults: number = 30,
        nextToken?: string
      ) => {
        const response = await fetch(
          `${baseUrl}/${normalizeNetworkId(
            networkId
          )}/transactions/${address.toLowerCase()}?maxResults=${maxResults}${
            nextToken ? `&nextToken=${nextToken}` : ""
          }`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch transactions");
        }

        const json = (await response.json()) as APIResponse;
        return TxResponseSchema.parse(json.result);
      },
      getRecentTransactions: async (
        networkId: string,
        maxResults: number = 30,
        nextToken?: string
      ) => {
        const response = await fetch(
          `${baseUrl}/${normalizeNetworkId(
            networkId
          )}/transactions?maxResults=${maxResults}${
            nextToken ? `&nextToken=${nextToken}` : ""
          }`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch transactions");
        }

        const json = (await response.json()) as APIResponse;
        return TxResponseSchema.parse(json.result);
      },
    },
  };

  return instance;
}
