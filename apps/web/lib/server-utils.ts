import "server-only";
import { unstable_cache } from "next/cache";
import { cache } from "react";
import { env } from "~/env.mjs";
import Web3 from "web3";
import { z } from "zod";
import { fetchLoad, getEventSignatureName } from "./utils";

type Callback = (...args: any[]) => Promise<any>;
export function nextCache<T extends Callback>(
  cb: T,
  options: {
    tags: string[];
  },
) {
  return cache(unstable_cache(cb, options.tags, options));
}

export async function getZbcPrice() {
  const response = await fetch("https://api2.zebec.io/price").then((res) =>
    res.json(),
  );
  return Number(Web3.utils.fromWei(response.price));
}

export async function getGasPrice(rpcURL: string) {
  const web3 = new Web3(rpcURL);
  return Number(await web3.eth.getGasPrice());
}

export async function getBlockMetrics(rpcURL: string) {
  const web3 = new Web3(rpcURL);
  const latestBlock = await web3.eth.getBlockNumber();
  const block = await web3.eth.getBlock(latestBlock);
  const latestBlockTimestamp = block.timestamp;
  const thousandBlocksAgo = await web3.eth.getBlock(latestBlock - 1000);
  const thousandBlocksAgoTimestamp = thousandBlocksAgo.timestamp;
  const avgBlockTime =
    (Number(latestBlockTimestamp) - Number(thousandBlocksAgoTimestamp)) / 1000;
  return {
    avgBlockTime,
    latestBlock,
  };
}

export async function getRealTimeMetrics() {
  let baseUrl = "http://localhost:3000";
  if (process.env.VERCEL_URL) {
    baseUrl = `https://${process.env.VERCEL_URL}`;
  }
  if (process.env.NEXT_PUBLIC_VERCEL_URL) {
    baseUrl = `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;
  }

  const metrics = await fetch(`${baseUrl}/api/metrics`).then((res) =>
    res.json(),
  );
  return {
    contractsDeployed: Number(metrics.result.realTimeMetrics.CONTRACT),
    totalTransactions: Number(metrics.result.realTimeMetrics.TRANSACTION),
    walletAddresses: Number(metrics.result.realTimeMetrics.UNIQUE_ADDRESS),
  };
}

export async function getTransactionHistoryData() {
  const TransactionVolumeSchema = z.object({
    endTime: z.string(),
    volumeInWei: z.string(),
  });

  return fetch(env.METRICS_API_URL + "/v2/1/transaction-volume-data")
    .then((res) => res.json())
    .then((res) => {
      return TransactionVolumeSchema.array().parse(
        res.result.transactionVolumes,
      );
    })
    .then((res) => {
      return res
        .sort((a, b) => {
          return Number(new Date(a.endTime)) - Number(new Date(b.endTime));
        })
        .slice(-14)
        .map((item) => {
          return {
            time: new Date(item.endTime).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            }),
            volume: Number(Web3.utils.fromWei(item.volumeInWei)),
          };
        });
    });
}

export async function getLatestBlocks(networkSlug: string, rpcURL: string) {
  const latestBlocks = await fetchLoad({
    network: networkSlug,
    type: "pagination",
    query: `blocks:latest`,
  });

  if (latestBlocks) {
    const web3 = new Web3(rpcURL);
    const { components } = latestBlocks;
    const blockPromises = components.pagination.data.values
      .slice(0, 5)
      .map((value: { query: string }) =>
        web3.eth.getBlock(value.query),
      ) as Array<ReturnType<typeof web3.eth.getBlock>>;

    const blocks = await Promise.all(blockPromises);
    const blockData = blocks.map((block) => {
      return {
        number: block.number,
        noOfTransactions: block.transactions.length,
        timestamp: Number(block.timestamp) * 1000,
      };
    });

    return blockData;
  }
  return [];
}

export async function getLatestTransactions(
  networkSlug: string,
  rpcURL: string,
) {
  const latestTransactions = await fetchLoad({
    network: networkSlug,
    type: "pagination",
    query: `transactions:latest`,
  });

  if (latestTransactions) {
    const { components } = latestTransactions;
    const web3 = new Web3(rpcURL);
    const txHashes = components.pagination.data.values
      .slice(0, 5)
      .map((value: { query: string }) => value.query) as string[];

    const getTransaction = async (hash: string) => {
      const [tx, receipt] = await Promise.all([
        web3.eth.getTransaction(hash),
        web3.eth.getTransactionReceipt(hash),
      ]);

      const eventSignatureName = await getEventSignatureName(
        receipt.logs[0]?.topics?.[0],
      );

      // Copied from here :
      // https://github.com/modularcloud/explorer/blob/264c22fe5080e4b1a31eecb428789888ad59da90/apps/web/integrations/evm/transaction/row.ts#L13C3-L23C31
      let type = "Unknown";
      if (!tx.to) {
        type = "Contract Creation";
      }
      if (tx.to && Number(tx.value) > 0) {
        type = "Transfer";
      }
      if (eventSignatureName) {
        type = eventSignatureName;
      }
      type = type.split("(")[0];

      return {
        hash: tx.hash,
        success: receipt.status,
        type,
      };
    };

    const transactionData = await Promise.all(
      txHashes.map((txRef) => getTransaction(txRef)),
    );

    return transactionData;
  }

  return [];
}
