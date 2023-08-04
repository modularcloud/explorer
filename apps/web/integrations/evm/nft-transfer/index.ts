import { createLoader, EngineConfigMetadata } from "@modularcloud/ecs";
import { createModularCloud } from "@modularcloud/sdk";
import Web3 from "web3";
import { AbiItem } from "web3-utils";
import { z } from "zod";
import { CardTransform } from "./card";
import { RowTransform } from "./row";
import { uploadFile } from "@uploadcare/upload-client";
import { convertToHttpIfIpfs } from "../../../lib/utils";

const MetadataSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  image: z.string(),
  decimals: z.number().optional(),
  properties: z.any().optional(),
});

// thanks https://github.com/metachris/eth-go-bindings/blob/master/erc721/erc721.go#L30
const Erc721ABI: AbiItem[] = [
  {
    inputs: [
      { internalType: "string", name: "name_", type: "string" },
      { internalType: "string", name: "symbol_", type: "string" },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "approved",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      { indexed: false, internalType: "bool", name: "approved", type: "bool" },
    ],
    name: "ApprovalForAll",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "from", type: "address" },
      { indexed: true, internalType: "address", name: "to", type: "address" },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [{ internalType: "bytes4", name: "interfaceId", type: "bytes4" }],
    name: "supportsInterface",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "owner", type: "address" }],
    name: "balanceOf",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
    name: "ownerOf",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
    name: "tokenURI",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
    ],
    name: "approve",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
    name: "getApproved",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "operator", type: "address" },
      { internalType: "bool", name: "approved", type: "bool" },
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "owner", type: "address" },
      { internalType: "address", name: "operator", type: "address" },
    ],
    name: "isApprovedForAll",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "from", type: "address" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
    ],
    name: "transferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "from", type: "address" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "from", type: "address" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
      { internalType: "bytes", name: "_data", type: "bytes" },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

// thanks https://github.com/metachris/eth-go-bindings/blob/master/erc1155/erc1155.go#L30
const Erc1155ABI: AbiItem[] = [
  {
    inputs: [{ internalType: "string", name: "uri_", type: "string" }],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      { indexed: false, internalType: "bool", name: "approved", type: "bool" },
    ],
    name: "ApprovalForAll",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      { indexed: true, internalType: "address", name: "from", type: "address" },
      { indexed: true, internalType: "address", name: "to", type: "address" },
      {
        indexed: false,
        internalType: "uint256[]",
        name: "ids",
        type: "uint256[]",
      },
      {
        indexed: false,
        internalType: "uint256[]",
        name: "values",
        type: "uint256[]",
      },
    ],
    name: "TransferBatch",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      { indexed: true, internalType: "address", name: "from", type: "address" },
      { indexed: true, internalType: "address", name: "to", type: "address" },
      { indexed: false, internalType: "uint256", name: "id", type: "uint256" },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "TransferSingle",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: "string", name: "value", type: "string" },
      { indexed: true, internalType: "uint256", name: "id", type: "uint256" },
    ],
    name: "URI",
    type: "event",
  },
  {
    inputs: [{ internalType: "bytes4", name: "interfaceId", type: "bytes4" }],
    name: "supportsInterface",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "uri",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "account", type: "address" },
      { internalType: "uint256", name: "id", type: "uint256" },
    ],
    name: "balanceOf",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address[]", name: "accounts", type: "address[]" },
      { internalType: "uint256[]", name: "ids", type: "uint256[]" },
    ],
    name: "balanceOfBatch",
    outputs: [{ internalType: "uint256[]", name: "", type: "uint256[]" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "operator", type: "address" },
      { internalType: "bool", name: "approved", type: "bool" },
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "account", type: "address" },
      { internalType: "address", name: "operator", type: "address" },
    ],
    name: "isApprovedForAll",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "from", type: "address" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "id", type: "uint256" },
      { internalType: "uint256", name: "amount", type: "uint256" },
      { internalType: "bytes", name: "data", type: "bytes" },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "from", type: "address" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256[]", name: "ids", type: "uint256[]" },
      { internalType: "uint256[]", name: "amounts", type: "uint256[]" },
      { internalType: "bytes", name: "data", type: "bytes" },
    ],
    name: "safeBatchTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const ERC721TransferEventTopic =
  "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef";
const ERC1155TransferSingleEventTopic =
  "0xc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f62";
const ERC1155TransferBatchEventTopic =
  "0x4a39dc06d4c0dbc64b70af90fd698a233a518aa5d07e595d983b8c0526c8f7fb";

function topicMatches(topic: string, expectedTopic: string) {
  return topic.toLowerCase() === expectedTopic.toLowerCase();
}

export async function NFTTransferExtract(
  _q: unknown,
  metadata: EngineConfigMetadata,
) {
  const query = z.string().parse(_q);
  const [txHash, logIndex] = query.split(":");
  const web3 = new Web3(metadata.endpoint);

  const receipt = await web3.eth.getTransactionReceipt(txHash);
  const log = receipt.logs.find((log) => log.logIndex === Number(logIndex));

  // TODO: hande ERC1155 topics
  if (!log) {
    throw new Error("Transfer not found");
  }
  const blockNumber = receipt.blockNumber;
  const mc = createModularCloud(process.env.EVM_CHAIN_DATA_SERVICE);
  const [/*token,*/ block] = await Promise.all([
    // mc.evm.getTokenByAddress(metadata.network.id, log.address),
    web3.eth.getBlock(blockNumber),
  ]);
  const timestamp = block.timestamp;

  const [eventSignature, ...eventParams] = log.topics;
  if (topicMatches(eventSignature, ERC721TransferEventTopic)) {
    const {
      from,
      to,
      tokenId: id,
    } = web3.eth.abi.decodeLog(
      [
        {
          indexed: true,
          internalType: "address",
          name: "from",
          type: "address",
        },
        { indexed: true, internalType: "address", name: "to", type: "address" },
        {
          indexed: true,
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
      ],
      log.data,
      eventParams,
    ) as unknown as { from: string; to: string; tokenId: string };
    const uri: string = await new web3.eth.Contract(
      Erc721ABI,
      log.address,
    ).methods
      .tokenURI(id)
      .call();
    const metadata = await fetch(convertToHttpIfIpfs(uri))
      .then((res) => res.json())
      .then((res) => {
        try {
          return MetadataSchema.parse(res);
        } catch {}
      })
      .then(async (res) => {
        if (res) {
          const fimg = await fetch(convertToHttpIfIpfs(res.image));
          const fimgb = Buffer.from(await fimg.arrayBuffer());
          const result = await uploadFile(fimgb, {
            publicKey: process.env.UPLOADCARE_API_KEY as string,
            store: "auto",
            metadata: {
              uri,
            },
          });
          return {
            ...res,
            image: result.cdnUrl,
          };
        }
      });
    return {
      type: "ERC721 Transfer",
      log,
      timestamp,
      blockNumber,
      id,
      from,
      to,
      metadata,
    };
  }

  if (topicMatches(eventSignature, ERC1155TransferSingleEventTopic)) {
    const { from, to, id, value } = web3.eth.abi.decodeLog(
      [
        {
          indexed: true,
          internalType: "address",
          name: "operator",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "from",
          type: "address",
        },
        { indexed: true, internalType: "address", name: "to", type: "address" },
        {
          indexed: false,
          internalType: "uint256",
          name: "id",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "value",
          type: "uint256",
        },
      ],
      log.data,
      eventParams,
    ) as unknown as {
      from: string;
      to: string;
      id: string;
      value: string;
    };

    const baseUri: string = await new web3.eth.Contract(
      Erc1155ABI,
      log.address,
    ).methods
      .uri(id)
      .call();
    const uri = baseUri.replace("{id}", web3.utils.padLeft(id, 64));
    const metadata = await fetch(convertToHttpIfIpfs(uri))
      .then((res) => res.json())
      .then((res) => {
        try {
          return MetadataSchema.parse(res);
        } catch {}
      })
      .then(async (res) => {
        if (res) {
          const fimg = await fetch(convertToHttpIfIpfs(res.image));
          const fimgb = Buffer.from(await fimg.arrayBuffer());
          const result = await uploadFile(fimgb, {
            publicKey: process.env.UPLOADCARE_API_KEY as string,
            store: "auto",
            metadata: {
              uri,
            },
          });
          return {
            ...res,
            image: result.cdnUrl,
          };
        }
      });
    return {
      type: "ERC1155 Transfer",
      log,
      timestamp,
      blockNumber,
      id,
      from,
      to,
      value,
      metadata,
    };
  }

  if (topicMatches(eventSignature, ERC1155TransferBatchEventTopic)) {
    const decodedLog = web3.eth.abi.decodeLog(
      [
        {
          indexed: true,
          internalType: "address",
          name: "operator",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "from",
          type: "address",
        },
        { indexed: true, internalType: "address", name: "to", type: "address" },
        {
          indexed: false,
          internalType: "uint256[]",
          name: "ids",
          type: "uint256[]",
        },
        {
          indexed: false,
          internalType: "uint256[]",
          name: "values",
          type: "uint256[]",
        },
      ],
      log.data,
      eventParams,
    ) as unknown as {
      from: string;
      to: string;
      ids: string[];
      values: string[];
    };
    const { from, to, ids, values } = decodedLog;
    const baseUri: string = await new web3.eth.Contract(
      Erc1155ABI,
      log.address,
    ).methods
      .uri(ids[0])
      .call();
    const uri = baseUri.replace("{id}", String(web3.utils.padLeft(ids[0], 64)));
    const metadata = await fetch(convertToHttpIfIpfs(uri))
      .then((res) => res.json())
      .then((res) => {
        try {
          return MetadataSchema.parse(res);
        } catch {}
      })
      .then(async (res) => {
        if (res) {
          const fimg = await fetch(convertToHttpIfIpfs(res.image));
          const fimgb = Buffer.from(await fimg.arrayBuffer());
          const result = await uploadFile(fimgb, {
            publicKey: process.env.UPLOADCARE_API_KEY as string,
            store: "auto",
            metadata: {
              original: res.image,
            },
          });
          return {
            ...res,
            image: result.cdnUrl,
          };
        }
      });
    return {
      type: "ERC1155 Batch Transfer",
      log,
      timestamp,
      blockNumber,
      ids,
      from,
      to,
      values,
      metadata,
    };
  }

  throw new Error("Unsupported event type");
}

export const NFTTransferLoader = createLoader()
  .addExtract(NFTTransferExtract)
  .addTransform(CardTransform)
  .addTransform(RowTransform)
  .finish();
