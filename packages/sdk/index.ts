import JSZip from "jszip";
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
  Contract,
  ContractSchema,
  LogResponse,
  LogResponseSchema,
  BlobResponse,
  BlobResponseSchema,
  OwnerResponse,
  OwnerResponseSchema,
  CollectionResponse,
  CollectionResponseSchema,
  VerificationResponseSchema,
  VerificationResponse,
  VerifiedSource,
  VerifiedSourceSchema,
} from "./schemas";

export interface ModularCloud {
  celestia: {
    listBlobsByNamespace: (
      networkId: string,
      namespace: string,
      maxResults?: number,
      nextToken?: string,
    ) => Promise<BlobResponse>;
  };
  evm: {
    getTokenBalancesByAddress: (
      networkId: string,
      address: string,
    ) => Promise<TokenBalanceResponse>;
    // TODO: combine this with the above
    getNFTBalancesByAddress: (
      networkId: string,
      address: string,
      maxResults?: number,
      nextToken?: string,
    ) => Promise<NFTBalance[]>;
    getEventsByTokenAddress: (
      networkId: string,
      address: string,
      maxResults?: number,
      nextToken?: string,
    ) => Promise<EventResponse>;
    getEventsByAccountAddress: (
      networkId: string,
      address: string,
      maxResults?: number,
      nextToken?: string,
    ) => Promise<EventResponse>;
    // TODO: combine this with the above
    getNFTEventsByAccountAddress: (
      networkId: string,
      address: string,
      maxResults?: number,
      nextToken?: string,
    ) => Promise<EventResponse>;
    getTokenByAddress: (networkId: string, address: string) => Promise<Token>;
    getAccountBalancesByTokenAddress: (
      networkId: string,
      address: string,
      maxResults?: number,
      nextToken?: string,
    ) => Promise<HolderResponse>;
    getTransactionsByAddress: (
      networkId: string,
      address: string,
      maxResults?: number,
      nextToken?: string,
    ) => Promise<TxResponse>;
    getRecentTransactions: (
      networkId: string,
      maxResults?: number,
      nextToken?: string,
    ) => Promise<TxResponse>;
    describeContract: (networkId: string, address: string) => Promise<Contract>;
    listContractLogs: (
      networkId: string,
      address: string,
      maxResults?: number,
      nextToken?: string,
    ) => Promise<LogResponse>;
    listNFTOwners: (
      networkId: string,
      address: string,
      tokenId: string,
      maxResults?: number,
      nextToken?: string,
    ) => Promise<OwnerResponse>;
    listNFTCollection: (
      networkId: string,
      address: string,
      maxResults?: number,
      nextToken?: string,
    ) => Promise<CollectionResponse>;
    isContractVerified: (
      networkId: string,
      address: string,
    ) => Promise<VerificationResponse>;
    getVerifiedSource: (
      networkId: string,
      address: string,
    ) => Promise<VerifiedSource>;
  };
}

type APIResponse = {
  result: any;
};

const VERIFICATION_CHAINID: Record<string, string> = {
  proteus: "88002",
  mainnet: "22222",
};
function normalizeVerificationChainID(networkId: string) {
  return VERIFICATION_CHAINID[networkId] || networkId;
}

export function createModularCloud(baseUrl?: string): ModularCloud {
  if (!baseUrl) {
    throw new Error("Base URL is required to initialize Modular Cloud.");
  }

  const instance: ModularCloud = {
    celestia: {
      listBlobsByNamespace: async (
        networkId: string,
        namespace: string,
        maxResults: number = 30,
        nextToken?: string,
      ) => {
        const response = await fetch(
          `${baseUrl}/${networkId}/blobs-summary/${namespace}?maxResults=${maxResults}${
            nextToken ? `&nextToken=${nextToken}` : ""
          }`,
        );

        if (!response.ok) {
          throw new Error("Failed to fetch blobs");
        }

        const json = (await response.json()) as APIResponse;
        return BlobResponseSchema.parse(json.result);
      },
    },
    evm: {
      getTokenBalancesByAddress: async (networkId: string, address: string) => {
        const response = await fetch(
          `${baseUrl}/${networkId}/token-balances/${address.toLowerCase()}`,
        );

        if (!response.ok) {
          throw new Error("Failed to fetch token balances!");
        }

        const json = (await response.json()) as APIResponse;
        return TokenBalanceResponseSchema.parse(json.result);
      },
      getNFTBalancesByAddress: async (networkId: string, address: string) => {
        const response = await fetch(
          `${baseUrl}/${networkId}/token-balances/${address.toLowerCase()}?tokenType=NFT`,
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
      listContractLogs: async (
        networkId: string,
        address: string,
        maxResults: number = 30,
        nextToken?: string,
      ) => {
        const response = await fetch(
          `${baseUrl}/${networkId}/contract-logs/${address.toLowerCase()}?maxResults=${maxResults}${
            nextToken ? `&nextToken=${nextToken}` : ""
          }`,
        );

        if (!response.ok) {
          throw new Error("Failed to fetch events");
        }

        const json = (await response.json()) as APIResponse;
        return LogResponseSchema.parse(json.result);
      },
      getEventsByTokenAddress: async (
        networkId: string,
        address: string,
        maxResults: number = 30,
        nextToken?: string,
      ) => {
        const response = await fetch(
          `${baseUrl}/${networkId}/token-events/${address.toLowerCase()}?maxResults=${maxResults}${
            nextToken ? `&nextToken=${nextToken}` : ""
          }`,
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
        nextToken?: string,
      ) => {
        const response = await fetch(
          `${baseUrl}/${networkId}/account-events/${address.toLowerCase()}?maxResults=${maxResults}${
            nextToken ? `&nextToken=${nextToken}` : ""
          }`,
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
        nextToken?: string,
      ) => {
        const response = await fetch(
          `${baseUrl}/${networkId}/account-events/${address.toLowerCase()}?eventType=NFTTransfer&maxResults=${maxResults}${
            nextToken ? `&nextToken=${nextToken}` : ""
          }`,
        );

        if (!response.ok) {
          throw new Error("Failed to fetch events");
        }

        const json = (await response.json()) as APIResponse;
        return EventResponseSchema.parse(json.result);
      },
      getTokenByAddress: async (networkId: string, address: string) => {
        const response = await fetch(
          `${baseUrl}/${networkId}/token/${address.toLowerCase()}`,
        );

        if (!response.ok) {
          throw new Error("Failed to fetch token");
        }

        const json = (await response.json()) as APIResponse;
        return TokenSchema.parse(json.result.token);
      },
      describeContract: async (networkId: string, address: string) => {
        const response = await fetch(
          `${baseUrl}/${networkId}/contracts/${address.toLowerCase()}`,
        );

        if (!response.ok) {
          throw new Error("Failed to fetch contract");
        }

        const json = (await response.json()) as APIResponse;
        return ContractSchema.parse(json.result.contract);
      },
      getAccountBalancesByTokenAddress: async (
        networkId: string,
        address: string,
        maxResults: number = 30,
        nextToken?: string,
      ) => {
        const response = await fetch(
          `${baseUrl}/${networkId}/holder-balances/${address.toLowerCase()}?maxResults=${maxResults}${
            nextToken ? `&nextToken=${nextToken}` : ""
          }`,
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
        nextToken?: string,
      ) => {
        const response = await fetch(
          `${baseUrl}/${networkId}/transactions/${address.toLowerCase()}?maxResults=${maxResults}${
            nextToken ? `&nextToken=${nextToken}` : ""
          }`,
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
        nextToken?: string,
      ) => {
        let url = baseUrl;
        const isNumbericId = !isNaN(Number(networkId));
        if (isNumbericId && process.env.ALT_BASE_URL) {
          console.log("Using alt base url");
          url = process.env.ALT_BASE_URL;
        }
        const response = await fetch(
          `${url}/${networkId}/transactions?maxResults=${maxResults}${
            nextToken ? `&nextToken=${nextToken}` : ""
          }`,
        );

        if (!response.ok) {
          throw new Error("Failed to fetch transactions");
        }

        const json = (await response.json()) as APIResponse;
        return TxResponseSchema.parse(json.result);
      },
      listNFTOwners: async (
        networkId: string,
        address: string,
        tokenId: string,
        maxResults: number = 30,
        nextToken?: string,
      ) => {
        const response = await fetch(
          `${baseUrl}/${networkId}/nft/owners/${address.toLowerCase()}/${tokenId}?maxResults=${maxResults}${
            nextToken ? `&nextToken=${nextToken}` : ""
          }`,
        );

        if (!response.ok) {
          throw new Error("Failed to fetch owners");
        }

        const json = (await response.json()) as APIResponse;
        return OwnerResponseSchema.parse(json.result);
      },
      listNFTCollection: async (
        networkId: string,
        address: string,
        maxResults: number = 30,
        nextToken?: string,
      ) => {
        const response = await fetch(
          `${baseUrl}/${networkId}/nft/collection/${address.toLowerCase()}?maxResults=${maxResults}${
            nextToken ? `&nextToken=${nextToken}` : ""
          }`,
        );

        if (!response.ok) {
          throw new Error("Failed to fetch collection");
        }

        const json = (await response.json()) as APIResponse;
        return CollectionResponseSchema.parse(json.result);
      },
      isContractVerified: async (
        networkId: string,
        address: string,
      ): Promise<VerificationResponse> => {
        const response = await global.fetch(
          `https://contract-verification.vercel.app/api/contract-verification/fetch-verified?contractaddress=${address}&chainid=${normalizeVerificationChainID(
            networkId,
          )}`,
        );

        if (!response.ok) {
          throw new Error("Failed to fetch verified contract");
        }

        return VerificationResponseSchema.parse(await response.json());
      },

      getVerifiedSource: async (networkId: string, address: string) => {
        const response = await fetch(
          `https://contract-verification.vercel.app/api/contract-verification/fetch-verified?contractaddress=${address}&chainid=${normalizeVerificationChainID(
            networkId,
          )}`,
        );

        if (!response.ok) {
          throw new Error("Failed to fetch verified contract source");
        }

        const uploadedUrl = VerificationResponseSchema.parse(
          await response.json(),
        ).uploadedUrl;

        // Fetch the ZIP file
        const zipResponse = await fetch(uploadedUrl);

        if (!zipResponse.ok) {
          throw new Error("Failed to fetch ZIP file");
        }

        const zipBuffer = await zipResponse.arrayBuffer();

        // Using the 'jszip' library to handle ZIP data
        const zip = new JSZip();
        await zip.loadAsync(zipBuffer);

        const files: Record<string, string> = {};

        // Extracting the file contents
        const filePromises = Object.keys(zip.files).map((filename) => {
          if (!zip.file(filename)) return; // Ignore directories
          return zip
            .file(filename)
            ?.async("string")
            .then((content) => {
              files[filename] = content;
            });
        });

        await Promise.all(filePromises);

        // Validate and return the result as a VerifiedSource
        return VerifiedSourceSchema.parse(files);
      },
    },
  };

  return instance;
}
