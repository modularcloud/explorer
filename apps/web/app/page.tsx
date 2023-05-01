import { Metadata } from "next";
import { getWhitelabel, truncateString } from "../lib/utils";
import { BigLogo } from "../ui/big-logo";
import { Footer } from "../ui/footer";
import { Search } from "./[network]/[type]/(standard)/[query]/[[...viewPath]]/(components)/search";
import DollarCircled from "./[network]/[type]/(standard)/[query]/[[...viewPath]]/(components)/(icons)/DollarCircled";
import CapDisplay from "./[network]/[type]/(standard)/[query]/[[...viewPath]]/(components)/(icons)/CapDisplay";
import FuelTankIcon from "./[network]/[type]/(standard)/[query]/[[...viewPath]]/(components)/(icons)/FuelTank";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
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

const whitelabel = getWhitelabel();

export const metadata: Metadata = {
  title: `${whitelabel.name.join("")} by Modular Cloud`,
};

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
  return (
    <div className="flex flex-col items-center bg-specialty-gray bg-[url('/images/home-bg.svg')] bg-no-repeat min-h-screen">
      <div className="flex flex-col items-center justify-center w-full space-y-10 xs:pt-40 pt-[12.5rem]">
        {/* @ts-expect-error Async Server Component */}
        <BigLogo />
        <div className="sm:w-[27.875rem] xs:w-[20.4375rem] w-11/12">
          <Search optionGroups={whitelabel.searchOptions} />
        </div>
      </div>

      <div className="w-full bg-gradient-blend py-12 px-10 mt-10 border-y-2 border-transluscent">
        <div className="flex items-center justify-between mx-auto gap-16 max-w-5xl">
          <div className="flex items-start justify start gap-2">
            <div className="mt-1 ">
              <DollarCircled />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-night">ZBC Price</span>
              <span className="text-[mid-dark]">$134.58</span>
            </div>
          </div>

          <div className="flex items-start justify start gap-2">
            <div className="mt-1 ">
              <CapDisplay />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-night">Market Cap</span>
              <span className="text-[mid-dark]">$224,980,459.00</span>
            </div>
          </div>

          <div className="flex items-start justify start gap-2">
            <div className="mt-1 ">
              <FuelTankIcon />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-night">Gas Price</span>
              <span className="text-[mid-dark]">23.22 Gwei ($0.98)</span>
            </div>
          </div>

          <div className="flex-1 w-full">
            {/* <ResponsiveContainer width="100%" height="100%">
              <LineChart
                width={500}
                height={300}
                data={data}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="pv"
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                />
                <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer> */}
          </div>
        </div>
        <div className="border-2 rounded-xl py-8 bg-white max-w-5xl mx-auto divide-x-2 mt-8 flex items-center justify-center gap-6">
          {TransactionSummary.map(({ icon: Icon, title, value, id }) => (
            <div className="flex items-start justify start gap-2 px-6" key={id}>
              <div className="mt-1 ">
                <Icon />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-night">{title}</span>
                <span className="text-[mid-dark]">{value}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full flex items-stretch mx-auto justify-evenly gap-4 mt-10 max-w-[90%] py-6 px-10">
        <div className="flex-1 bg-white p-10 rounded-lg border-2">
          <div className="flex items-center justify-between">
            <h3 className="flex items-center justify-start gap-2 font-bold">
              <BlocksIcon />
              Latest Blocks
            </h3>

            <button className="border-2 rounded-lg py-2 px-3">View All</button>
          </div>
          <table className="responsive border-collapse w-full mt-8">
            <tbody>
              {MockBlockData.map((block) => {
                return (
                  <tr key={block.id} className="border-b-2">
                    <td className="pb-2">
                      <div className="flex flex-col gap-1">
                        <span className="text-ocean">{block.height}</span>
                        <span className="text-[mid-dark]">12 secs ago</span>
                      </div>
                    </td>
                    <td className="pb-2">
                      <div>
                        miner:{" "}
                        <em className="text-ocean  not-italic">
                          {truncateString(block.minerAddress, 8, 8)}
                        </em>
                      </div>
                    </td>
                    <td className="text-right pb-2">
                      <button className="border-2 rounded-3xl py-2 px-3">
                        {block.blockreward.toLocaleString()} ZBC
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="flex-1 bg-white p-10 rounded-lg border-2">
          <div className="flex items-center justify-between">
            <h3 className="flex items-center justify-start gap-2 font-bold">
              <BarChartIcon />
              Latest Transactions
            </h3>

            <button className="border-2 rounded-lg py-2 px-3">View All</button>
          </div>
          <table className="responsive border-collapse w-full mt-8">
            <tbody>
              {MockTransactionsData.map((transaction) => {
                return (
                  <tr key={transaction.id} className="border-b-2">
                    <td className="pb-2">
                      <div className="flex flex-col gap-1">
                        <span className="text-ocean">
                          {truncateString(transaction.hash, 10, 1)}
                        </span>
                        <span className="text-[mid-dark]">12 secs ago</span>
                      </div>
                    </td>
                    <td className="pb-2">
                      <div className="flex flex-col gap-1">
                        <span>
                          From:{" "}
                          <em className="text-ocean not-italic">
                            {truncateString(transaction.from, 8, 8)}
                          </em>
                        </span>
                        <span>
                          To:{" "}
                          <em className="text-ocean not-italic">
                            {truncateString(transaction.recipient, 8, 8)}
                          </em>
                        </span>
                      </div>
                    </td>
                    <td className="text-right pb-2">
                      <button className="border-2 rounded-3xl py-2 px-3">
                        {transaction.amount} ZBC
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="max-w-5xl mx-auto flex items-center justify-center gap-6 mt-12 mb-4">
        {MockShortcutsData.map(({ title, key }) => (
          <div className="flex items-center justify-start gap-3 text-night">
            <span className="block rounded-md p-1 w-6 items-center justify-center flex h-6 border-2 border-[#0806151a] bg-[#0806150d] w-fit">
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
