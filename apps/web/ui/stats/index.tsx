import { SummaryPresenter } from "~/ui/presenters/summary-presenter";
import { ExplorerLineChart, ExplorerLineChartProps } from "~/ui/chart";
import { BlocksAndTransactionsSummaryDisplay } from "~/ui/tables";
import Web3 from "web3";
import { z } from "zod";
import { convertWeiToBestUnit, convertWeiToUSD } from "~/lib/evm";
import SvgClockCount from "~/ui/icons/ClockCount";
import SvgBarChartIcon from "~/ui/icons/BarChartIcon";
import SvgBlocksIcon from "~/ui/icons/BlocksIcon";
import SvgWalletIcon from "~/ui/icons/WalletIcon";
import SvgContractFileIcon from "~/ui/icons/ContractFileIcon";
import SvgCapDisplay from "~/ui/icons/CapDisplay";
import SvgFuelTankIcon from "~/ui/icons/FuelTank";
import SvgDollarCircle from "~/ui/icons/DollarCircled";
import { env } from "~/env.mjs";

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
    res.json()
  );
  return Number(Web3.utils.fromWei(response.price));
}

async function getGasPrice() {
  const web3 = new Web3("https://api.evm.nautilus.prod.eclipsenetwork.xyz");
  return await web3.eth.getGasPrice();
}

async function getBlockMetrics() {
  const web3 = new Web3("https://api.evm.nautilus.prod.eclipsenetwork.xyz");
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
  const metrics = await fetch("https://nautscan.com/api/metrics").then((res) =>
    res.json()
  );
  return {
    contractsDeployed: metrics.result.metrics.CONTRACT,
    totalTransactions: metrics.result.metrics.TRANSACTION,
    walletAddresses: metrics.result.metrics.UNIQUE_ADDRESS,
    totalGasUsed: metrics.result.metrics.GAS_USED,
  };
}

async function getTransactionVolumes(): Promise<
  ExplorerLineChartProps["data"]
> {
  return fetch(process.env.METRICS_API_URL + "/v2/1/transaction-volume-data")
  // return fetch(env.METRICS_API_URL + "/transaction-volume-data")
    .then((res) => res.json())
    .then((res) => {
      return TransactionVolumeSchema.array().parse(
        res.result.transactionVolumes
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
                    value={`${convertWeiToBestUnit(
                      gasPrice,
                      "ZBC"
                    )} (${convertWeiToUSD(gasPrice, zbcPrice, true)})`}
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
                "en-US"
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
                "en-US"
              )}`}
              title="Wallet Addresses"
              icon={<SvgWalletIcon />}
            />
          </div>
          <div className="flex w-full justify-center max-lg:py-4 lg:px-4">
            <SummaryPresenter
              value={`${realTimeMetrics.contractsDeployed.toLocaleString(
                "en-US"
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
                value={`${convertWeiToBestUnit(
                  gasPrice,
                  "ZBC"
                )} (${convertWeiToUSD(gasPrice, zbcPrice, true)})`}
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
