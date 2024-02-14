import { createResolver } from "@modularcloud-resolver/core";
import {
  BalancesResolver,
  getHubMessages,
  helpers,
  RollAppReceiveAddressResolver,
  RollAppSentAddressResolver,
} from "@modularcloud-resolver/rollapp";
import { getDefaultSidebar } from "../../../../../helpers";
import { PaginationContext } from "../../../../../schemas/context";
import { Page, PageContext } from "../../../../../schemas/page";
import {
  getTransactionProperties,
  selectRowTransactionProperties,
  selectSidebarTransactionProperties,
} from "../../../helpers";
import { Transaction } from "../../../types";

type AddressPagination = {
  sent?: {
    page: number;
    perPage: number;
    index: number;
  };
  received?: {
    page: number;
    perPage: number;
    index: number;
  };
};

// @ts-ignore
import * as cryptoAddrCodec from "crypto-addr-codec";

// From https://github.com/evmos/evmosjs/blob/main/packages/address-converter/src/%40types/crypto-add-codec/index.d.ts
type Codec = {
  isValidChecksumAddress(address: string, chainId: number | null): boolean;
  stripHexPrefix(address: string): string;
  toChecksumAddress(address: string, chainId: number | null): string;
};
const isValidChecksumAddress = (cryptoAddrCodec as Codec)
  .isValidChecksumAddress;
const stripHexPrefix = (cryptoAddrCodec as Codec).stripHexPrefix;
const toChecksumAddress = (cryptoAddrCodec as Codec).toChecksumAddress;

import { bech32 } from "bech32";

// From https://github.com/evmos/evmosjs/blob/main/packages/address-converter/src/converter.ts
function makeChecksummedHexDecoder(chainId?: number) {
  return (data: string) => {
    const stripped = stripHexPrefix(data);
    if (
      !isValidChecksumAddress(data, chainId || null) &&
      stripped !== stripped.toLowerCase() &&
      stripped !== stripped.toUpperCase()
    ) {
      throw Error("Invalid address checksum");
    }
    return Buffer.from(stripHexPrefix(data), "hex");
  };
}

function makeChecksummedHexEncoder(chainId?: number) {
  return (data: Buffer) =>
    toChecksumAddress(data.toString("hex"), chainId || null);
}

const hexChecksumChain = (name: string, chainId?: number) => ({
  decoder: makeChecksummedHexDecoder(chainId),
  encoder: makeChecksummedHexEncoder(chainId),
  name,
});

export const ETH = hexChecksumChain("ETH");

function makeBech32Encoder(prefix: string) {
  return (data: Buffer) => bech32.encode(prefix, bech32.toWords(data));
}

function makeBech32Decoder(currentPrefix: string) {
  return (data: string) => {
    const { prefix, words } = bech32.decode(data);
    if (prefix !== currentPrefix) {
      throw Error("Unrecognised address format");
    }
    return Buffer.from(bech32.fromWords(words));
  };
}

const bech32Chain = (name: string, prefix: string) => ({
  decoder: makeBech32Decoder(prefix),
  encoder: makeBech32Encoder(prefix),
  name,
});

export const ETHERMINT = bech32Chain("ETHERMINT", "ethm");

export const ethToEthermint = (ethAddress: string) => {
  const data = ETH.decoder(ethAddress);
  return ETHERMINT.encoder(data);
};

export const ethermintToEth = (ethermintAddress: string) => {
  const data = ETHERMINT.decoder(ethermintAddress);
  return ETH.encoder(data);
};

export const DYMENSION = bech32Chain("DYMENSION", "dym");

export const ethToDymension = (ethAddress: string) => {
  const data = ETH.decoder(ethAddress);
  return DYMENSION.encoder(data);
};

export const dymensionToEth = (evmosAddress: string) => {
  const data = DYMENSION.decoder(evmosAddress);
  return ETH.encoder(data);
};

function parseAddressPagination(b64: string): AddressPagination {
  const json = Buffer.from(b64, "base64").toString();
  const parsed = JSON.parse(json);
  return parsed;
}

function buildAddressPagination(
  limit: number,
  sentCursor: number | null,
  receivedCursor: number | null,
) {
  const pagination: AddressPagination = {};
  if (sentCursor !== null) {
    pagination.sent = {
      page: Math.floor(sentCursor / limit) + 1,
      perPage: limit,
      index: sentCursor % limit,
    };
  }
  if (receivedCursor !== null) {
    pagination.received = {
      page: Math.floor(receivedCursor / limit) + 1,
      perPage: limit,
      index: receivedCursor % limit,
    };
  }
  return Buffer.from(JSON.stringify(pagination)).toString("base64");
}

export const RollAppAddressPageBalancesResolver = createResolver(
  {
    id: "rollapp-page-address-balances-0.0.0",
    cache: false, // all cache is disabled for now
  },
  async (
    {
      context,
      address,
    }: { context: PageContext & PaginationContext; address: string },
    getBalances: typeof BalancesResolver,
    getSent: typeof RollAppSentAddressResolver,
    getReceived: typeof RollAppReceiveAddressResolver,
  ) => {
    let dymensionAddress = address;
    if (address.startsWith("0x")) {
      dymensionAddress = ethToDymension(address);
    }

    const limit = context.limit ?? 30;
    const addressPagination = context.after
      ? parseAddressPagination(context.after)
      : {
          sent: {
            page: 1,
            perPage: limit,
            index: 0,
          },
          received: {
            page: 1,
            perPage: limit,
            index: 0,
          },
        };
    const balances: { denom: string; amount: string }[] = await getBalances({
      endpoint: context.rpcEndpoint,
      address: dymensionAddress,
    }).then((res) => {
      if (res.type === "success") {
        return res.result.balances;
      }
      console.log("Error getting balances", dymensionAddress, res);
      return [];
    });
    const results: Transaction[] = [];

    const page: Page = {
      context,
      metadata: {
        title: `Address ${dymensionAddress}`,
        description: `Address ${dymensionAddress} on ${context.chainBrand}`,
      },
      sidebar: getDefaultSidebar("Address", dymensionAddress, "Balances"),
      tabs: [
        {
          text: "Balances",
          route: ["addresses", dymensionAddress],
        },
        {
          text: "Transactions",
          route: ["addresses", dymensionAddress, "transactions"],
        },
      ],
      body: {
        type: "notebook",
        properties: balances.length
          ? Object.fromEntries(
              await Promise.all(
                balances.map(async (bal) => {
                  if (bal.denom.charAt(0) === "u") {
                    return [
                      bal.denom.slice(1).toUpperCase(),
                      {
                        type: "standard",
                        payload: (Number(bal.amount) / 10 ** 18).toFixed(18),
                      },
                    ];
                  }
                  if (bal.denom.startsWith("ibc/")) {
                    const denomIntegration = await fetch(
                      `${
                        process.env.INTERNAL_INTEGRATION_API_URL
                      }/integrations/dym/devnet/denom-hash/${
                        bal.denom.split("/")[1]
                      }`,
                    ).then((res) => res.json());
                    if (denomIntegration.result.integration) {
                      const chain =
                        denomIntegration.result.integration.config.token;
                      return [
                        chain.name.toUpperCase(),
                        {
                          type: "standard",
                          payload: (
                            Number(bal.amount) / Math.pow(10, chain.decimals)
                          ).toFixed(chain.decimals),
                        },
                      ];
                    }
                  }
                  return [bal.denom, { type: "standard", payload: bal.amount }];
                }),
              ),
            )
          : { [context.nativeToken]: { type: "standard", payload: "0" } },
      },
    };
    return page;
  },
  [BalancesResolver, RollAppSentAddressResolver, RollAppReceiveAddressResolver],
);
