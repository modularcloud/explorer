"use client";
import useSWR from "swr";
import BlocksIcon from "../../app/[network]/[type]/(standard)/[query]/[[...viewPath]]/(components)/(icons)/BlocksIcon";
import { Badge } from "../../app/[network]/[type]/(standard)/[query]/[[...viewPath]]/(components)/badge";
import { truncateString } from "../../lib/utils";
import BarChartIcon from "../../app/[network]/[type]/(standard)/[query]/[[...viewPath]]/(components)/(icons)/BarChartIcon";
import Link from "next/link";
import { ClientTime } from "./time";

type HeaderProps = {
  icon: React.ReactNode;
  title: string;
  buttonText?: string;
  href: string;
};
const TableHeader: React.FC<HeaderProps> = ({
  icon,
  title,
  buttonText,
  href,
}) => {
  return (
    <div className="flex items-center justify-between">
      <h3 className="flex items-center justify-start gap-2 font-bold">
        {icon}
        {title}
      </h3>

      <Link href={href} className="border rounded-lg py-1 px-2">
        {buttonText ?? "View All"}
      </Link>
    </div>
  );
};

const fetcher = (url: string) => fetch(url).then((res) => res.json());
export const BlocksAndTransactionsSummaryDisplay = () => {
  const { data, error } = useSWR("/api/transactions-summary", fetcher);
  if (!data) {
    return null;
  }
  const { blocks, transactions } = data;
  return (
    <div className="w-full flex items-stretch space-between max-w-[76rem] gap-6 lg:gap-8 flex-col lg:flex-row">
      <BlockSummaryTable data={blocks} />{" "}
      <TransactionsSummaryTable data={transactions} />
    </div>
  );
};

export const BlockSummaryTable = ({ data }: { data: any[] }) => {
  return (
    <div className="flex-1 bg-white px-4 py-6 rounded-lg border border-mid-dark-100 lifting-shadow">
      <TableHeader
        href="/latest/blocks"
        icon={<BlocksIcon />}
        title="Latest Blocks"
      />
      <div className="w-full mt-8 md:hidden">
        <ul className="divide-y px-1 space-y-2">
          {data.map((block) => (
            <li className="py-2" key={block.height}>
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <Link href={`/block/${block.height}`} className="text-ocean">
                    {block.height}
                  </Link>
                  <span className="text-[rgba(42,43,46,0.48)]">
                    <ClientTime time={Number(block.timestamp)} />
                  </span>
                </div>
                <Badge
                  long
                  text={`${block.blockreward.toLocaleString("en-US")} ZBC`}
                />
              </div>

              <div className="mt-2">
                <span className="block">Miner: </span>
                <em className="text-ocean  not-italic">
                  {truncateString(block.minerAddress, 8, 8)}
                </em>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <table className="responsive border-collapse hidden md:table w-full mt-8">
        <tbody>
          {data.map((block) => {
            return (
              <tr
                key={block.height}
                className="border-b border-[rgba(8,6,21,0.06)]"
              >
                <td className="py-2">
                  <div className="flex flex-col">
                    <Link
                      href={`/block/${block.height}`}
                      className="text-ocean"
                    >
                      {block.height}
                    </Link>
                    <span className="text-[rgba(42,43,46,0.48)]">
                      {" "}
                      <ClientTime time={Number(block.timestamp)} />
                    </span>
                  </div>
                </td>
                <td className="py-2">
                  <div>
                    miner:{" "}
                    <Link
                      href={`/address/${block.minerAddress}`}
                      className="text-ocean"
                    >
                      {truncateString(block.minerAddress, 8, 8)}
                    </Link>
                  </div>
                </td>
                <td className="py-2">
                  <div className="ml-auto w-fit text-right">
                    <Badge
                      long
                      text={`${block.blockreward.toLocaleString()} ZBC`}
                    />
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export const TransactionsSummaryTable = ({ data }: { data: any[] }) => {
  return (
    <div className="flex-1 bg-white px-4 py-6  rounded-lg border border-mid-dark-100 lifting-shadow">
      <TableHeader
        href="/latest/transactions"
        icon={<BarChartIcon />}
        title="Latest Transactions"
      />
      <div className="w-full mt-8 md:hidden">
        <ul className="divide-y px-1 space-y-2">
          {data.map((transaction) => (
            <li key={transaction.hash} className="py-2">
              <div className="flex items-center justify-between">
                <div className="flex flex-col gap-1">
                  <Link href={`/tx/${transaction.hash}`} className="text-ocean">
                    {truncateString(transaction.hash, 10, 0)}
                  </Link>
                  <span className="text-[rgba(42,43,46,0.48)]">
                    <ClientTime time={Number(transaction.timestamp)} />
                  </span>
                </div>

                <Badge long text={`${transaction.amount} ZBC`} />
              </div>

              <div className="flex flex-col gap-1 mt-2 whitespace-nowrap">
                <span>
                  <span className="block">From: </span>
                  <Link
                    href={`/address/${transaction.from}`}
                    className="text-ocean"
                  >
                    {truncateString(transaction.from, 8, 8)}
                  </Link>
                </span>
                <span>
                  To:{" "}
                  {transaction.recipient ? (
                    <Link
                      href={`/address/${transaction.recipient}`}
                      className="text-ocean"
                    >
                      {truncateString(transaction.recipient, 8, 8)}
                    </Link>
                  ) : (
                    <span>None</span>
                  )}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <table className="responsive border-collapse w-full mt-8 hidden md:table">
        <tbody>
          {data.map((transaction) => {
            return (
              <tr
                key={transaction.hash}
                className="border-b border-[rgba(8,6,21,0.06)]"
              >
                <td className="py-2">
                  <div className="flex flex-col gap-1">
                    <Link
                      href={`/tx/${transaction.hash}`}
                      className="text-ocean"
                    >
                      {truncateString(transaction.hash, 10, 0)}
                    </Link>
                    <span className="text-[rgba(42,43,46,0.48)]">
                      <ClientTime time={Number(transaction.timestamp)} />
                    </span>
                  </div>
                </td>
                <td className="py-2">
                  <div className="flex flex-col gap-1 whitespace-nowrap">
                    <span>
                      From:{" "}
                      <Link
                        href={`/address/${transaction.from}`}
                        className="text-ocean"
                      >
                        {truncateString(transaction.from, 8, 8)}
                      </Link>
                    </span>
                    <span>
                      To:{" "}
                      {transaction.recipient ? (
                        <Link
                          href={`/address/${transaction.recipient}`}
                          className="text-ocean"
                        >
                          {truncateString(transaction.recipient, 8, 8)}
                        </Link>
                      ) : (
                        <span>None</span>
                      )}
                    </span>
                  </div>
                </td>
                <td className="text-right py-2">
                  <div className="w-fit ml-auto">
                    <Badge long text={`${transaction.amount} ZBC`} />
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
