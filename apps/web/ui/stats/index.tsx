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
import { ExplorerLineChart } from "../chart";
import { BlocksAndTransactionsSummaryDisplay } from "../tables";
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

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function Stats({ extended }: Props) {
  const { data, error } = useSWR("/api/transactions", fetcher);
  if (!data) {
    return null;
  }
  const {
    zbcPrice,
    gasPrice,
    metrics: realTimeMetrics,
    blockMetrics,
    transactionVolumes,
  } = data;
  const priceStatsReady = !!zbcPrice && !!gasPrice;
  const metricsCanLoad = !!blockMetrics && realTimeMetrics;
  console.log({ data, error });

  return (
    <>
      <div className="w-full bg-gradient-blend py-8 md:py-12 px-2 md:px-4 mt-10 border-y border-transluscent">
        <div className="flex items-center flex-col lg:flex-row justify-center mx-auto gap-6 md:gap-12 md:gap-6 max-w-4xl md:max-w-5xl flex-wrap md:flex-nowrap">
          {extended ? (
            <div className="w-full md:flex-1 px-4 md:px-2">
              {priceStatsReady ? (
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
        {metricsCanLoad && (
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
                value={`${realTimeMetrics?.totalTransactions.toLocaleString(
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
        )}
      </div>

      {extended ? null : (
        <div className="w-full max-w-2xl px-4 flex gap-16 items-center mt-4 mb-20 justify-center">
          {priceStatsReady ? (
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
