import { getWhitelabel } from "../lib/utils";
import { BigLogo } from "../ui/big-logo";
import { Footer } from "../ui/footer";
import { Search } from "./[network]/[type]/(standard)/[query]/[[...viewPath]]/(components)/search";
import DollarCircled from "./[network]/[type]/(standard)/[query]/[[...viewPath]]/(components)/(icons)/DollarCircled";
import CapDisplay from "./[network]/[type]/(standard)/[query]/[[...viewPath]]/(components)/(icons)/CapDisplay";
import FuelTankIcon from "./[network]/[type]/(standard)/[query]/[[...viewPath]]/(components)/(icons)/FuelTank";
import ClockCount from "./[network]/[type]/(standard)/[query]/[[...viewPath]]/(components)/(icons)/ClockCount";
import BarChartIcon from "./[network]/[type]/(standard)/[query]/[[...viewPath]]/(components)/(icons)/BarChartIcon";
import BlocksIcon from "./[network]/[type]/(standard)/[query]/[[...viewPath]]/(components)/(icons)/BlocksIcon";
import WalletIcon from "./[network]/[type]/(standard)/[query]/[[...viewPath]]/(components)/(icons)/WalletIcon";
import ContractFileIcon from "./[network]/[type]/(standard)/[query]/[[...viewPath]]/(components)/(icons)/ContractFileIcon";
import { MockShortcutsData } from "../schemas/mock-data";
import { ExplorerLineChart } from "../ui/chart";
import { SummaryPresenter } from "../ui/presenters/summary-presenter";
import { BlocksAndTransactionsSummaryDisplay } from "../ui/tables";
import { useCallback } from "react";

const whitelabel = getWhitelabel();

const TransactionSummary = [
  {
    icon: ClockCount,
    title: "Avg Block Time",
    value: "12.2 seconds",
    id: "block-time",
  },
  {
    icon: BarChartIcon,
    title: "Total Transactions",
    value: "17,107,101",
    id: "total-transactions",
  },
  {
    icon: BlocksIcon,
    title: "Total Blocks",
    value: "17,107,101",
    id: "total-blocks",
  },
  {
    icon: WalletIcon,
    title: "Wallet Addresses",
    value: "17,107,101",
    id: "wallet-addresses",
  },
  {
    icon: ContractFileIcon,
    title: "Contract Deployed",
    value: "17,107,101",
    id: "contract-deployed",
  },
];

export default function HomePage() {
  const hasTableData = true;

  const basicSummaryData = useCallback(() => {
    return (
      <div className="grid grid-cols-2 items-center content-start justify-start w-full gap-x-8 gap-y-6">
        <SummaryPresenter
          icon={<DollarCircled />}
          title="ZBC Price"
          value={`$${(134.58).toLocaleString()}`}
        />
        <SummaryPresenter
          icon={<CapDisplay />}
          title="Market Cap"
          value={`$${(224980459).toLocaleString()}`}
        />
        <div className="col-span-2 flex flex-col items-center">
          <hr className="w-full md:hidden mb-3" />
          <SummaryPresenter
            icon={<FuelTankIcon />}
            title="Gas Price"
            value="23.22 Gwei ($0.98)"
          />
        </div>
      </div>
    );
  }, []);

  return (
    <div className="flex flex-col items-center bg-specialty-gray radial-check-bg  min-h-screen">
      <div className="flex flex-col items-center justify-center w-full space-y-10 pt-6 sm:pt-40 md:pt-[12.5rem]">
        {/* @ts-expect-error Async Server Component */}
        <BigLogo />
        <div className="w-full md:w-[27.875rem] px-2">
          <Search optionGroups={whitelabel.searchOptions} />
        </div>
      </div>

      <div className="w-full bg-gradient-blend py-8 md:py-12 px-2 md:px-10 mt-10 border-y border-transluscent">
        <div className="flex items-center justify-center mx-auto gap-6 md:gap-12 max-w-4xl lp:max-w-5xl flex-wrap">
          <div className="w-full">
            {hasTableData ? basicSummaryData() : null}
          </div>
          <div className="flex-1 w-full max-w-xs xs:max-w-md md:max-w-xl justify-self-center order-first md:order-last -ml-8">
            <ExplorerLineChart />
          </div>
        </div>
        <div className="border lifting-shadow rounded-xl py-8 bg-white max-w-4xl lp:max-w-5xl mx-auto divide-y md:divide-x md:divide-y-none mt-8 flex-wrap px-2 flex items-center justify-center gap-0">
          {TransactionSummary.map(({ icon: Icon, title, value, id }) => (
            <div className="px-4 py-4 w-full flex justify-center" key={id}>
              <SummaryPresenter value={value} title={title} icon={<Icon />} />
            </div>
          ))}
        </div>
      </div>

      {hasTableData ? null : (
        <div className="w-fit flex gap-16 items-center mt-4 mb-20 justify-center">
          {basicSummaryData()}
        </div>
      )}

      {hasTableData && (
        <div className="w-full mt-6 py-6 px-2">
          <BlocksAndTransactionsSummaryDisplay />
        </div>
      )}

      <div className="max-w-5xl mx-auto flex items-center justify-center flex-wrap gap-6 mt-12 mb-4">
        {MockShortcutsData.map(({ title, key }) => (
          <div className="flex items-center justify-start gap-3 text-night">
            <span className="block rounded-md p-1 w-6 h-6 items-center justify-center flex border-2 backdrop-blur-sm border-night-100 bg-[rgba(8,6,21,0.05)]">
              {key}
            </span>
            <span>{title}</span>
          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
}
