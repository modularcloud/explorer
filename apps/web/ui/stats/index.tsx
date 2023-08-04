import { SummaryPresenter } from "../presenters/summary-presenter";
import { ExplorerLineChart, ExplorerLineChartProps } from "../chart";
import { BlocksAndTransactionsSummaryDisplay } from "../tables";
import Web3 from "web3";
import { z } from "zod";
import SvgClockCount from "../icons/ClockCount";
import SvgBarChartIcon from "../icons/BarChartIcon";
import SvgBlocksIcon from "../icons/BlocksIcon";
import SvgWalletIcon from "../icons/WalletIcon";
import SvgContractFileIcon from "../icons/ContractFileIcon";
import SvgCapDisplay from "../icons/CapDisplay";
import SvgFuelTankIcon from "../icons/FuelTank";
import SvgDollarCircle from "../icons/DollarCircled";

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

async function getZbcPrice() {
  const response = await fetch("https://api2.zebec.io/price").then((res) =>
    res.json(),
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
    (Number(latestBlockTimestamp) - Number(thousandBlocksAgoTimestamp)) / 1000;
  return {
    avgBlockTime,
    latestBlock,
  };
}

async function getRealTimeMetrics() {
  const metrics = await fetch("https://triton.nautscan.com/api/metrics").then(
    (res) => res.json(),
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
      <div className="bg-gradient-blend border-transluscent mt-10 w-full border-y px-2 py-8 md:px-4 md:py-12">
        <div className="mx-auto flex max-w-4xl flex-col flex-wrap items-center justify-center gap-6 md:max-w-5xl md:flex-nowrap md:gap-12 md:gap-6 lg:flex-row">
          {extended ? (
            <div className="w-full px-4 md:flex-1 md:px-2">
              <div className="grid w-full grid-cols-2 content-start items-center justify-start gap-x-8 gap-y-6 md:grid-cols-3 md:gap-3">
                <SummaryPresenter
                  icon={<SvgDollarCircle />}
                  title="ZBC Price"
                  value={subPennyCurrencyFormatter.format(zbcPrice)}
                />
                <SummaryPresenter
                  icon={<SvgCapDisplay />}
                  title="Market Cap"
                  value={currencyFormatter.format(zbcPrice * 700000000)}
                />
                <div className="col-span-2 flex flex-col items-center md:col-span-1 md:items-start">
                  <hr className="mb-3 w-full md:hidden" />
                  <SummaryPresenter
                    icon={<SvgFuelTankIcon />}
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
          <div className="xs:max-w-md order-first -ml-8 w-full max-w-xs flex-1 justify-self-center md:max-w-xl md:max-w-xl lg:order-last">
            <ExplorerLineChart data={transactionVolumes} />
          </div>
        </div>
        <div className="lifting-shadow mx-auto mt-8 flex max-w-[64rem] flex-wrap items-center justify-center gap-0 divide-y rounded-xl border bg-white px-2 py-10 md:divide-x lg:flex-nowrap lg:divide-y-0 lg:py-6">
          <div className="flex w-full justify-center max-lg:py-4 lg:px-4">
            <SummaryPresenter
              value={`${blockMetrics.avgBlockTime.toPrecision(3)} seconds`}
              title="Avg Block Time"
              icon={<SvgClockCount />}
            />
          </div>
          <div className="flex w-full justify-center max-lg:py-4 lg:px-4">
            <SummaryPresenter
              value={`${realTimeMetrics.totalTransactions.toLocaleString(
                "en-US",
              )}`}
              title="Total Transactions"
              icon={<SvgBarChartIcon />}
            />
          </div>
          <div className="flex w-full justify-center max-lg:py-4 lg:px-4">
            <SummaryPresenter
              value={`${blockMetrics.latestBlock.toLocaleString("en-US")}`}
              title="Total Blocks"
              icon={<SvgBlocksIcon />}
            />
          </div>
          <div className="flex w-full justify-center max-lg:py-4 lg:px-4">
            <SummaryPresenter
              value={`${realTimeMetrics.walletAddresses.toLocaleString(
                "en-US",
              )}`}
              title="Wallet Addresses"
              icon={<SvgWalletIcon />}
            />
          </div>
          <div className="flex w-full justify-center max-lg:py-4 lg:px-4">
            <SummaryPresenter
              value={`${realTimeMetrics.contractsDeployed.toLocaleString(
                "en-US",
              )}`}
              title="Contracts Deployed"
              icon={<SvgContractFileIcon />}
            />
          </div>
        </div>
      </div>

      {extended ? null : (
        <div className="mb-20 mt-4 flex w-full max-w-2xl items-center justify-center gap-16 px-4">
          <div className="grid w-full grid-cols-2 content-start items-center justify-start gap-x-8 gap-y-6 md:grid-cols-3 md:gap-3">
            <SummaryPresenter
              icon={<SvgDollarCircle />}
              title="ZBC Price"
              value={subPennyCurrencyFormatter.format(zbcPrice)}
            />
            <SummaryPresenter
              icon={<SvgCapDisplay />}
              title="Market Cap"
              value={currencyFormatter.format(zbcPrice * 700000000)}
            />
            <div className="col-span-2 flex flex-col items-center md:col-span-1 md:items-start">
              <hr className="mb-3 w-full md:hidden" />
              <SummaryPresenter
                icon={<SvgFuelTankIcon />}
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
        <div className="radial-bg flex w-full justify-center px-4 py-6 md:py-10">
          <BlocksAndTransactionsSummaryDisplay />
        </div>
      )}
    </>
  );
}
