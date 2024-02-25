import { SimpleJsonSchema } from "./json-schema-utils";

const eth_getBlockByNumber: SimpleJsonSchema = {
  type: "object",
  properties: {
    number: {
      type: "string",
      contentEncoding: "base16",
    },

    hash: {
      type: "string",
    },
    timestamp: {
      type: "string",
      contentEncoding: "base16",
      "x-render": "timestamp",
      "x-units": "seconds",
    },
    gasLimit: {
      type: "string",
      contentEncoding: "base16",
    },
    gasUsed: {
      type: "string",
      contentEncoding: "base16",
    },
    extraData: {
      type: "string",
    },
    logsBloom: {
      type: "string",
    },
    miner: {
      type: "string",
    },
    mixHash: {
      type: "string",
    },
    nonce: {
      type: "string",
      contentEncoding: "base16",
    },
    parentHash: {
      type: "string",
    },
    receiptsRoot: {
      type: "string",
    },
    sha3Uncles: {
      type: "string",
    },
    size: {
      type: "string",
      contentEncoding: "base16",
    },
    stateRoot: {
      type: "string",
    },
    totalDifficulty: {
      type: "string",
    },
    transactions: {
      type: "array",
      items: {
        type: "object",
        properties: {
          blockHash: {
            type: "string",
          },
          blockNumber: {
            type: "string",
          },
          from: {
            type: "string",
          },
          gas: {
            type: "string",
          },
          gasPrice: {
            type: "string",
          },
          hash: {
            type: "string",
          },
          input: {
            type: "string",
          },
          nonce: {
            type: "string",
          },
          to: {
            type: "string",
          },
          transactionIndex: {
            type: "string",
          },
          value: {
            type: "string",
          },
          v: {
            type: "string",
          },
          r: {
            type: "string",
          },
          s: {
            type: "string",
          },
        },
      },
    },
    transactionsRoot: {
      type: "string",
    },
    uncles: {
      type: "array",
      items: {
        type: "string",
      },
    },
    difficulty: {
      type: "string",
      contentEncoding: "base16",
    },
  },
};
const eth_getTransactionByHash: SimpleJsonSchema = {
  type: "object",
  properties: {
    blockHash: {
      type: "string",
    },
    blockNumber: {
      type: "string",
      contentEncoding: "base16",
    },
    from: {
      type: "string",
    },
    gas: {
      type: "string",
      contentEncoding: "base16",
    },
    gasPrice: {
      type: "string",
      contentEncoding: "base16",
    },
    hash: {
      type: "string",
    },
    input: {
      type: "string",
    },
    nonce: {
      type: "string",
      contentEncoding: "base16",
    },
    to: {
      type: "string",
    },
    transactionIndex: {
      type: "string",
      contentEncoding: "base16",
    },
    value: {
      type: "string",
      contentEncoding: "base16",
    },
    v: {
      type: "string",
      contentEncoding: "base16",
    },
    r: {
      type: "string",
      contentEncoding: "base16",
    },
    s: {
      type: "string",
      contentEncoding: "base16",
    },
  },
};
const eth_getTransactionReceipt: SimpleJsonSchema = {
  type: "object",
  properties: {
    blockHash: {
      type: "string",
    },
    blockNumber: {
      type: "string",
      contentEncoding: "base16",
    },
    contractAddress: {
      type: "string",
    },
    cumulativeGasUsed: {
      type: "string",
      contentEncoding: "base16",
    },
    from: {
      type: "string",
    },
    gasUsed: {
      type: "string",
      contentEncoding: "base16",
    },
    logs: {
      type: "array",
      items: {
        type: "object",
        properties: {
          address: {
            type: "string",
          },
          blockHash: {
            type: "string",
          },
          blockNumber: {
            type: "string",
          },
          data: {
            type: "string",
          },
          logIndex: {
            type: "string",
          },
          removed: {
            type: "boolean",
          },
          topics: {
            type: "array",
            items: {
              type: "string",
            },
          },
          transactionHash: {
            type: "string",
          },
          transactionIndex: {
            type: "string",
          },
        },
      },
    },
    logsBloom: {
      type: "string",
    },
    root: {
      type: "string",
    },
    to: {
      type: "string",
    },
    transactionHash: {
      type: "string",
    },
    transactionIndex: {
      type: "string",
      contentEncoding: "base16",
    },
  },
};

export const Schemas = {
  eth_getBlockByNumber,
  eth_getTransactionByHash,
  eth_getTransactionReceipt,
};
