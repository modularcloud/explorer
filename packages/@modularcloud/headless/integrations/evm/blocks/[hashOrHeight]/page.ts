import { createResolver } from "@modularcloud-resolver/core";
import { Page, PageContext } from "../../../../schemas/page";
import { BlockResolver, BlockHashResolver } from "@modularcloud-resolver/evm";
import { getDefaultSidebar } from "../../../../helpers";
import { jsonSchemaToPage } from "../../json-schema-utils";
import { Schemas } from "../../json-schemas";

const ex = {
  logsBloom:
    "0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
  transactionsRoot:
    "0x0000000000000000000000000000000000000000000000000000000000000001",
  receiptsRoot:
    "0x0000000000000000000000000000000000000000000000000000000000000001",
  stateRoot:
    "0x0000000000000000000000000000000000000000000000000000000000000001",
  uncles: [],
  sha3Uncles:
    "0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347",
  difficulty: "0x0",
  totalDifficulty: null,
  extraData: "0x",
  miner: "0x0000000000000000000000000000000000000000",
  nonce: "0x0000000000000000",
  mixHash: "0x0000000000000000000000000000000000000000000000000000000000000001",
  size: "0x1",
  gasLimit: "0x2dc6c00",
  gasUsed: "0x0",
  hash: "0xf347cf5ee2b0cdc9f13c9645dfe389038027bb5252b7de7a0632356409c4689f",
  number: "0x3e8",
  parentHash:
    "0xa032c2869e32c82adb812633591879e0c84a5ae4e1434c24d51d2fb4ef1cc6dc",
  timestamp: "0x65c13546",
  transactions: [],
};

export const EvmBlockPage = createResolver(
  {
    id: "evm-block-page-0.0.0",
    cache: false,
  },
  async (
    { context, hashOrHeight }: { context: PageContext; hashOrHeight: string },
    eth_getBlockByNumber: typeof BlockResolver,
    eth_getBlockByHash: typeof BlockHashResolver,
  ) => {
    let blockData;
    if (/^(0x)?([A-Fa-f0-9]{64})$/.test(hashOrHeight)) {
      // It's a hash, with or without 0x prefix
      blockData = await eth_getBlockByHash({
        endpoint: context.rpcEndpoint,
        hash: hashOrHeight.startsWith("0x")
          ? hashOrHeight
          : `0x${hashOrHeight}`,
      });
    } else {
      // It's a height
      blockData = await eth_getBlockByNumber({
        endpoint: context.rpcEndpoint,
        number: hashOrHeight,
      });
    }

    if (blockData.type !== "success") {
      throw new Error(`Block with hash/height ${hashOrHeight} not found.`);
    }
    
    const page: Page = {
      context,
      metadata: {
        title: "-",
        description: "-",
      },
      body: {
        type: "notebook",
        properties: jsonSchemaToPage(blockData.result, Schemas.eth_getBlockByNumber),
      },
      sidebar: getDefaultSidebar("Block", hashOrHeight, "Overview"),
      tabs: [
        { text: "Overview", route: [context.slug, "blocks", hashOrHeight] },
        {
          text: "Transactions",
          route: [context.slug, "blocks", hashOrHeight, "transactions"],
        },
      ],
    };
    return page;
  },
  [BlockResolver, BlockHashResolver],
);
