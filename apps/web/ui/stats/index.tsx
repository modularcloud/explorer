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
import SvgRadialBgIcon from "../../app/[network]/[type]/(standard)/[query]/[[...viewPath]]/(components)/(icons)/RadialBg";
import { z } from "zod";

type Props = {
  extended?: boolean;
};

export const TransactionVolumeSchema = z.object({
  endTime: z.string(),
  volumeInWei: z.string(),
});
export type TransactionVolume = z.infer<typeof TransactionVolumeSchema>;

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",

  // These options are needed to round to whole numbers if that's what you want.
  //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
  //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});

async function getZbcPrice() {
  const response = await fetch("https://api2.zebec.io/price").then((res) =>
    res.json()
  );
  return Number(Web3.utils.fromWei(response.price));
}

async function getGasPrice() {
  const web3 = new Web3("https://api.evm.zebec.eclipsenetwork.xyz/solana");
  const gasPrice = await web3.eth.getGasPrice();
  return Number(Web3.utils.fromWei(gasPrice));
}

async function getBlockMetrics() {
  const web3 = new Web3("https://api.evm.zebec.eclipsenetwork.xyz/solana");
  const latestBlock = await web3.eth.getBlockNumber();
  const block = await web3.eth.getBlock(latestBlock);
  const latestBlockTimestamp = block.timestamp;
  const thousandBlocksAgo = await web3.eth.getBlock(latestBlock - 1000);
  const thousandBlocksAgoTimestamp = thousandBlocksAgo.timestamp;
  const avgBlockTime =
    (Number(latestBlockTimestamp) - Number(thousandBlocksAgoTimestamp)) /
    1000 /* avg */ /
    1000; /* ms */
  return {
    avgBlockTime,
    latestBlock,
  };
}

async function getRealTimeMetrics() {
  const metrics = await fetch("https://triton.nautscan.com/api/metrics").then(
    (res) => res.json()
  );
  return {
    contractsDeployed: metrics.result.realTimeMetrics.CONTRACT,
    totalTransactions: metrics.result.realTimeMetrics.TRANSACTION,
    walletAddresses: metrics.result.realTimeMetrics.UNIQUE_ADDRESS,
  };
}

async function getTransactionVolumes(): Promise<
  ExplorerLineChartProps["data"]
> {
  return fetch(process.env.METRICS_API_URL + "/transaction-volume-data")
    .then((res) => res.json())
    .then((res) => {
      return TransactionVolumeSchema.array().parse(
        res.result.transactionVolumes
      );
    })
    .then((res) => {
      return res
        .sort((a, b) => {
          return Number(a.endTime) - Number(b.endTime);
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

export async function Stats({ extended }: Props) {
  const [
    zbcPrice,
    gasPrice,
    blockMetrics,
    realTimeMetrics,
    transactionVolumes,
  ] = await Promise.all([
    getZbcPrice(),
    getGasPrice(),
    getBlockMetrics(),
    getRealTimeMetrics(),
    getTransactionVolumes(),
  ]);
  return (
    <>
      <div className="w-full bg-gradient-blend py-8 md:py-12 px-2 md:px-4 mt-10 border-y border-transluscent">
        <div className="flex items-center flex-col lg:flex-row justify-center mx-auto gap-6 md:gap-12 md:gap-6 max-w-4xl md:max-w-5xl flex-wrap md:flex-nowrap">
          {extended ? (
            <div className="w-full md:flex-1 px-4 md:px-2">
              <div className="grid grid-cols-2 md:grid-cols-3 items-center content-start justify-start w-full gap-x-8 md:gap-3 gap-y-6">
                <SummaryPresenter
                  icon={<DollarCircled />}
                  title="ZBC Price"
                  value={formatter.format(zbcPrice)}
                />
                <SummaryPresenter
                  icon={<CapDisplay />}
                  title="Market Cap"
                  value={formatter.format(zbcPrice * 700000000)}
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
            </div>
          ) : null}
          <div className="flex-1 w-full max-w-xs xs:max-w-md md:max-w-xl md:max-w-xl justify-self-center order-first lg:order-last -ml-8">
            <ExplorerLineChart data={transactionVolumes} />
          </div>
        </div>
        <div className="border lifting-shadow rounded-xl lg:py-6 py-10 bg-white max-w-[64rem] mx-auto divide-y md:divide-x lg:divide-y-0 mt-8 flex-wrap px-2 flex lg:flex-nowrap items-center justify-center gap-0">
          <div className="max-lg:py-4 lg:px-4 w-full flex justify-center">
            <SummaryPresenter
              value={`${blockMetrics.avgBlockTime.toPrecision(3)} seconds`}
              title="Avg Block Time"
              icon={<ClockCount />}
            />
          </div>
          <div className="max-lg:py-4 lg:px-4 w-full flex justify-center">
            <SummaryPresenter
              value={`${realTimeMetrics.totalTransactions.toLocaleString(
                "en-US"
              )}`}
              title="Total Transactions"
              icon={<BarChartIcon />}
            />
          </div>
          <div className="max-lg:py-4 lg:px-4 w-full flex justify-center">
            <SummaryPresenter
              value={`${blockMetrics.latestBlock.toLocaleString("en-US")}`}
              title="Total Blocks"
              icon={<BlocksIcon />}
            />
          </div>
          <div className="max-lg:py-4 lg:px-4 w-full flex justify-center">
            <SummaryPresenter
              value={`${realTimeMetrics.walletAddresses.toLocaleString(
                "en-US"
              )}`}
              title="Wallet Addresses"
              icon={<WalletIcon />}
            />
          </div>
          <div className="max-lg:py-4 lg:px-4 w-full flex justify-center">
            <SummaryPresenter
              value={`${realTimeMetrics.contractsDeployed.toLocaleString(
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
          <div className="grid grid-cols-2 md:grid-cols-3 items-center content-start justify-start w-full gap-x-8 md:gap-3 gap-y-6">
            <SummaryPresenter
              icon={<DollarCircled />}
              title="ZBC Price"
              value={formatter.format(zbcPrice)}
            />
            <SummaryPresenter
              icon={<CapDisplay />}
              title="Market Cap"
              value={formatter.format(zbcPrice * 700000000)}
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
        </div>
      )}
      {/* 
      <div className="w-full -mt-[30px] relative hidden md:block">
        <div className=" w-full">
          <SvgRadialBgIcon width="100%" />
        </div>
      </div> */}

      {extended && (
        <div className="w-full px-4 py-6 md:py-10 flex justify-center radial-bg">
          <BlocksAndTransactionsSummaryDisplay />
        </div>
      )}
    </>
  );
}
