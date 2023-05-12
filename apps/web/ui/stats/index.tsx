"use client";
import useSWR from "swr";
import { SummaryPresenter } from "../presenters/summary-presenter";
import DollarCircled from "../../app/[network]/[type]/(standard)/[query]/[[...viewPath]]/(components)/(icons)/DollarCircled";
import CapDisplay from "../../app/[network]/[type]/(standard)/[query]/[[...viewPath]]/(components)/(icons)/CapDisplay";
import FuelTankIcon from "../../app/[network]/[type]/(standard)/[query]/[[...viewPath]]/(components)/(icons)/FuelTank";
import ClockCount from "../../app/[network]/[type]/(standard)/[query]/[[...viewPath]]/(components)/(icons)/ClockCount";
import BarChartIcon from "../../app/[network]/[type]/(standard)/[query]/[[...viewPath]]/(components)/(icons)/BarChartIcon";
import BlocksIcon from "../../app/[network]/[type]/(standard)/[query]/[[...viewPath]]/(components)/(icons)/BlocksIcon";
import WalletIcon from "../../app/[network]/[type]/(standard)/[query]/[[...viewPath]]/(components)/(icons)/WalletIcon";
import ContractFileIcon from "../../app/[network]/[type]/(standard)/[query]/[[...viewPath]]/(components)/(icons)/ContractFileIcon";
import { ExplorerLineChart, ExplorerLineChartProps } from "../chart";
import { BlocksAndTransactionsSummaryDisplay } from "../tables";
import Web3 from "web3";
import { z } from "zod";

type Props = {
  extended?: boolean;
};

export const TransactionVolumeSchema = z.object({
  endTime: z.string(),
  volumeInWei: z.string(),
});
export type TransactionVolume = z.infer<typeof TransactionVolumeSchema>;

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const subPennyCurrencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 4,
});

const getZbcPrice = async (url: string) => {
  const response = await fetch(url);
  return response
    .json()
    .then((response) => Number(Web3.utils.fromWei(response.price)));
};

async function getGasPrice(url: string) {
  const web3 = new Web3(url);
  return web3.eth
    .getGasPrice()
    .then((price) => Number(Web3.utils.fromWei(price)));
}

async function getBlockMetrics(url: string) {
  const web3 = new Web3(url);
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

async function getRealTimeMetrics(url: string) {
  const metrics = await fetch(url).then((res) => res.json());
  return {
    contractsDeployed: metrics.result.realTimeMetrics.CONTRACT,
    totalTransactions: metrics.result.realTimeMetrics.TRANSACTION,
    walletAddresses: metrics.result.realTimeMetrics.UNIQUE_ADDRESS,
  };
}

async function getTransactionVolumes(
  path: string
): Promise<ExplorerLineChartProps["data"]> {
  return fetch(`${process.env.METRICS_API_URL}/${path}`)
    .then((res) => res.json())
    .then((res) => {
      return TransactionVolumeSchema.array().parse(
        res.result?.transactionVolumes || []
      );
    })
    .then((res) => {
      return res
        .sort((a, b) => {
          return Number(new Date(a.endTime)) - Number(new Date(b.endTime));
        })
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

export function Stats({ extended }: Props) {
  const { data: zbcPrice } = useSWR("https://api2.zebec.io/price", getZbcPrice);
  const { data: gasPrice } = useSWR(
    "https://api.evm.zebec.eclipsenetwork.xyz/solana",
    getGasPrice
  );
  const { data: blockMetrics } = useSWR(
    "https://api.evm.zebec.eclipsenetwork.xyz/solana",
    getBlockMetrics
  );
  const { data: realTimeMetrics } = useSWR(
    "https://triton.nautscan.com/api/metrics",
    getRealTimeMetrics
  );
  const { data: transactionVolumes } = useSWR(
    "/transaction-volume-data",
    getTransactionVolumes
  );
  const priceStateReady = !!zbcPrice && !!gasPrice;

  console.log({ zbcPrice });
  console.log({ gasPrice });
  console.log({ blockMetrics });
  console.log({ realTimeMetrics });
  console.log({ transactionVolumes });
  return (
    <>
      <div className="w-full bg-gradient-blend py-8 md:py-12 px-2 md:px-4 mt-10 border-y border-transluscent">
        <div className="flex items-center flex-col lg:flex-row justify-center mx-auto gap-6 md:gap-12 md:gap-6 max-w-4xl md:max-w-5xl flex-wrap md:flex-nowrap">
          {extended ? (
            <div className="w-full md:flex-1 px-4 md:px-2">
              {priceStateReady ? (
                <div className="grid grid-cols-2 md:grid-cols-3 items-center content-start justify-start w-full gap-x-8 md:gap-3 gap-y-6">
                  <SummaryPresenter
                    icon={<DollarCircled />}
                    title="ZBC Price"
                    value={subPennyCurrencyFormatter.format(zbcPrice)}
                  />

                  <SummaryPresenter
                    icon={<CapDisplay />}
                    title="Market Cap"
                    value={currencyFormatter.format(zbcPrice * 700000000)}
                  />
                  <div className="col-span-2 md:col-span-1 flex flex-col items-center md:items-start">
                    <hr className="w-full md:hidden mb-3" />
                    <SummaryPresenter
                      icon={<FuelTankIcon />}
                      title="Gas Price"
                      value={`${gasPrice * 1000000000} Gwei ($${
                        gasPrice * zbcPrice < 0.01
                          ? (gasPrice * zbcPrice).toPrecision(3)
                          : gasPrice * zbcPrice
                      })`}
                    />
                  </div>
                </div>
              ) : null}
            </div>
          ) : null}
          <div className="flex-1 w-full max-w-xs xs:max-w-md md:max-w-xl md:max-w-xl justify-self-center order-first lg:order-last -ml-8">
            {transactionVolumes ? (
              <ExplorerLineChart data={transactionVolumes} />
            ) : null}
          </div>
        </div>
        <div className="border lifting-shadow rounded-xl lg:py-6 py-10 bg-white max-w-[64rem] mx-auto divide-y md:divide-x lg:divide-y-0 mt-8 flex-wrap px-2 flex lg:flex-nowrap items-center justify-center gap-0">
          <div className="max-lg:py-4 lg:px-4 w-full flex justify-center">
            <SummaryPresenter
              value={`${realTimeMetrics?.walletAddresses.toLocaleString(
                "en-US"
              )}`}
              title="Wallet Addresses"
              icon={<WalletIcon />}
            />
            {/* <SummaryPresenter
              value={`${blockMetrics.avgBlockTime.toPrecision(3)} seconds`}
              title="Avg Block Time"
              icon={<ClockCount />}
            /> */}
          </div>
          <div className="max-lg:py-4 lg:px-4 w-full flex justify-center">
            <SummaryPresenter
              value={`${realTimeMetrics?.totalTransactions.toLocaleString(
                "en-US"
              )}`}
              title="Total Transactions"
              icon={<BarChartIcon />}
            />
          </div>
          <div className="max-lg:py-4 lg:px-4 w-full flex justify-center">
            <SummaryPresenter
              value={`${realTimeMetrics?.walletAddresses.toLocaleString(
                "en-US"
              )}`}
              title="Wallet Addresses"
              icon={<WalletIcon />}
            />
            {/* <SummaryPresenter
              value={`${blockMetrics.latestBlock.toLocaleString("en-US")}`}
              title="Total Blocks"
              icon={<BlocksIcon />}
            /> */}
          </div>
          <div className="max-lg:py-4 lg:px-4 w-full flex justify-center">
            <SummaryPresenter
              value={`${realTimeMetrics?.walletAddresses.toLocaleString(
                "en-US"
              )}`}
              title="Wallet Addresses"
              icon={<WalletIcon />}
            />
          </div>
          <div className="max-lg:py-4 lg:px-4 w-full flex justify-center">
            <SummaryPresenter
              value={`${realTimeMetrics?.contractsDeployed.toLocaleString(
                "en-US"
              )}`}
              title="Contracts Deployed"
              icon={<ContractFileIcon />}
            />
          </div>
        </div>
      </div>

      {extended ? null : (
        <div className="w-full max-w-2xl px-4 flex gap-16 items-center mt-4 mb-20 justify-center">
          {priceStateReady ? (
            <div className="grid grid-cols-2 md:grid-cols-3 items-center content-start justify-start w-full gap-x-8 md:gap-3 gap-y-6">
              <SummaryPresenter
                icon={<DollarCircled />}
                title="ZBC Price"
                value={subPennyCurrencyFormatter.format(zbcPrice)}
              />
              <SummaryPresenter
                icon={<CapDisplay />}
                title="Market Cap"
                value={currencyFormatter.format(zbcPrice * 700000000)}
              />
              <div className="col-span-2 md:col-span-1 flex flex-col items-center md:items-start">
                <hr className="w-full md:hidden mb-3" />
                <SummaryPresenter
                  icon={<FuelTankIcon />}
                  title="Gas Price"
                  value={`${gasPrice * 1000000000} Gwei ($${
                    gasPrice * zbcPrice < 0.01
                      ? (gasPrice * zbcPrice).toPrecision(3)
                      : gasPrice * zbcPrice
                  })`}
                />
              </div>
            </div>
          ) : null}
        </div>
      )}
      {extended && (
        <div className="w-full px-4 py-6 md:py-10 flex justify-center radial-bg">
          <BlocksAndTransactionsSummaryDisplay />
        </div>
      )}
    </>
  );
}
