import * as React from "react";
import { cn } from "~/ui/shadcn/utils";
import {
  BarChart,
  Clock,
  Disabled,
  Document,
  Folder,
  Gas,
  Globe,
  UsdCoin,
} from "~/ui/icons";
import { IconCard } from "~/ui/network-widgets/widgets/icon-card";
import { TransactionHistory } from "~/ui/network-widgets/widgets/transaction-history";
import { LatestTransactions } from "~/ui/network-widgets/widgets/latest-transactions";
import { LatestBlocks } from "~/ui/network-widgets/widgets/latest-blocks";
import { WindowRefresher } from "~/ui/window-refresher";

import Web3 from "web3";
import { z } from "zod";
import { env } from "~/env.mjs";
import { convertWeiToBestUnit, convertWeiToUSD } from "~/lib/evm";
import { fetchLoad, getEventSignatureName } from "~/lib/utils";

import type { SingleNetwork } from "~/lib/network";

async function getZbcPrice() {
  const response = await fetch("https://api2.zebec.io/price").then((res) =>
    res.json(),
  );
  return Number(Web3.utils.fromWei(response.price));
}

async function getGasPrice(rpcURL: string) {
  const web3 = new Web3(rpcURL);
  return Number(await web3.eth.getGasPrice());
}

async function getBlockMetrics(rpcURL: string) {
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

async function getRealTimeMetrics() {
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

async function getTransactionHistoryData() {
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

async function getLatestBlocks(networkSlug: string, rpcURL: string) {
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

async function getLatestTransactions(networkSlug: string, rpcURL: string) {
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

interface Props {
  network: SingleNetwork;
}

export async function EvmWithPriceWidgetLayout({ network }: Props) {
  const [
    zbcPrice,
    gasPrice,
    blockMetrics,
    realTimeMetrics,
    transactionHistoryData,
    latestBlocks,
    latestTransactions,
  ] = await Promise.all([
    getZbcPrice(),
    getGasPrice(network.config.rpcUrls.evm!),
    getBlockMetrics(network.config.rpcUrls.evm!),
    getRealTimeMetrics(),
    getTransactionHistoryData(),
    getLatestBlocks(network.slug, network.config.rpcUrls.evm!),
    getLatestTransactions(network.slug, network.config.rpcUrls.evm!),
  ]);

  const currencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const subPennyCurrencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 4,
  });

  return (
    <div
      style={{
        // @ts-expect-error this is a CSS variable
        "--color-primary": network.config.primaryColor,
      }}
      className={cn(
        "grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 auto-rows-[minmax(145px,_1fr)] auto-cols-[145px]",
        "w-full gap-4 font-medium",
        "accent-primary place-items-stretch",
      )}
    >
      {/* 
        We don't want to ping endlessly the server on DEV 
        HMR does already does that.
      */}
      {process.env.NODE_ENV !== "development" && (
        <WindowRefresher timeoutSeconds={5} />
      )}

      <TransactionHistory
        mainColor={network.config.primaryColor}
        className="col-span-2 row-span-2 order-first lg:row-start-1 lg:col-start-4"
        data={transactionHistoryData}
      />

      <IconCard
        className="lg:row-start-1 lg:col-start-1"
        label="WALLET ADRESSES"
        icon={Folder}
        value={realTimeMetrics.walletAddresses.toLocaleString("en-US")}
      />
      <IconCard
        className="lg:row-start-1 lg:col-start-2"
        label="Avg Block Time"
        icon={Clock}
        value={`${blockMetrics.avgBlockTime} seconds`}
      />
      <LatestTransactions
        networkSlug={network.slug}
        className="col-span-2 row-span-2 lg:row-start-2"
        data={latestTransactions}
      />

      <IconCard
        className="lg:row-start-1 lg:col-start-3"
        label="TOTAL BLOCKS"
        icon={Disabled}
        value={blockMetrics.latestBlock.toLocaleString("en-US")}
      />

      <Placeholder className="col-span-1 row-span-1 hidden lg:block lg:row-start-2" />

      <IconCard
        className="lg:col-span-2 lg:row-start-3 lg:col-start-3"
        label="CONTRACTS DEPLOYED"
        icon={Document}
        value={realTimeMetrics.contractsDeployed.toLocaleString("en-US")}
      />

      <IconCard
        label="TOTAL TRANSACTIONS"
        icon={BarChart}
        value={realTimeMetrics.totalTransactions.toLocaleString("en-US")}
      />

      <IconCard
        label="ZBC PRICE"
        icon={UsdCoin}
        value={subPennyCurrencyFormatter.format(zbcPrice)}
      />

      <Placeholder className="lg:col-span-2 row-span-1 hidden lg:block" />
      <Placeholder className="col-span-1 row-span-1 hidden lg:block" />

      <IconCard
        label="MARKET CAP"
        icon={Globe}
        // Copied from the nautilus branch
        value={currencyFormatter.format(zbcPrice * 700_000_000)}
      />

      <IconCard
        label="GAS PRICE"
        icon={Gas}
        value={`${convertWeiToBestUnit(gasPrice, "ZBC")} (${convertWeiToUSD(
          gasPrice,
          zbcPrice,
          true,
        )})`}
      />
      <LatestBlocks
        networkSlug={network.slug}
        className="col-span-2 row-span-2 md:row-start-4 lg:col-start-4"
        data={latestBlocks}
      />
    </div>
  );
}

function Placeholder(props: { className?: string; isLoading?: boolean }) {
  return (
    <div
      className={cn(props.className, "bg-muted-100 rounded-lg", {
        "animate-pulse": props.isLoading,
      })}
    />
  );
}

export function EvmWithPriceSkeleton() {
  return (
    <div className="w-full grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5 auto-rows-[145px] auto-cols-[145px]">
      <Placeholder
        className="col-span-2 row-span-2 order-first lg:row-start-1 lg:col-start-4"
        isLoading
      />

      <Placeholder className="lg:row-start-1 lg:col-start-1" isLoading />
      <Placeholder className="lg:row-start-1 lg:col-start-2" isLoading />
      <Placeholder className="col-span-2 row-span-2 lg:row-start-2" isLoading />

      <Placeholder className="lg:row-start-1 lg:col-start-3" isLoading />

      <Placeholder
        className="col-span-1 row-span-1 hidden lg:block lg:row-start-2"
        isLoading
      />

      <Placeholder
        className="lg:col-span-2 lg:row-start-3 lg:col-start-3"
        isLoading
      />

      <Placeholder isLoading />

      <Placeholder isLoading />

      <Placeholder
        className="lg:col-span-2 row-span-1 hidden lg:block"
        isLoading
      />
      <Placeholder
        className="col-span-1 row-span-1 hidden lg:block"
        isLoading
      />

      <Placeholder isLoading />
      <Placeholder isLoading />
      <Placeholder
        className="col-span-2 row-span-2 md:row-start-4 lg:col-start-4"
        isLoading
      />
    </div>
  );
}
