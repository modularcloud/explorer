import { getWhitelabel, truncateString } from "../lib/utils";
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
import {
  MockBlockData,
  MockShortcutsData,
  MockTransactionsData,
} from "../schemas/mock-data";
import { ExplorerLineChart } from "../ui/chart";
import { SummaryPresenter } from "../ui/presenters/summary-presenter";
import { Badge } from "./[network]/[type]/(standard)/[query]/[[...viewPath]]/(components)/badge";
import { BlockSummaryTable, TransactionsSummaryTable } from "../ui/tables";
import { useCallback } from "react";

const whitelabel = getWhitelabel();

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

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
      <>
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
        <SummaryPresenter
          icon={<FuelTankIcon />}
          title="Gas Price"
          value="23.22 Gwei ($0.98)"
        />
      </>
    );
  }, []);

  return (
    <div className="flex flex-col items-center bg-specialty-gray radial-check-bg  min-h-screen">
      <div className="flex flex-col items-center justify-center w-full space-y-10 xs:pt-40 pt-[12.5rem]">
        {/* @ts-expect-error Async Server Component */}
        <BigLogo />
        <div className="w-[27.875rem]">
          <Search optionGroups={whitelabel.searchOptions} />
        </div>
      </div>

      <div className="w-full bg-gradient-blend py-12 px-10 mt-10 border-y border-transluscent">
        <div className="flex items-center justify-between mx-auto gap-16 max-w-5xl">
          {hasTableData ? basicSummaryData() : null}
          <div className="flex-1 w-fit max-w-xl justify-self-center mx-auto">
            <ExplorerLineChart />
          </div>
        </div>
        <div className="border lifting-shadow rounded-xl py-8 bg-white max-w-5xl mx-auto divide-x mt-8 flex items-center justify-center gap-6">
          {TransactionSummary.map(({ icon: Icon, title, value, id }) => (
            <div className="px-4" key={id}>
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
        <div className="w-full flex items-stretch mx-auto justify-evenly gap-4 mt-10 max-w-[90%] py-6 px-10">
          <BlockSummaryTable /> <TransactionsSummaryTable />
        </div>
      )}

      <div className="max-w-5xl mx-auto flex items-center justify-center gap-6 mt-12 mb-4">
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
