"use client";
import { Table } from "@modularcloud/design-system";
import BlocksIcon from "../../app/[network]/[type]/(standard)/[query]/[[...viewPath]]/(components)/(icons)/BlocksIcon";
import { Badge } from "../../app/[network]/[type]/(standard)/[query]/[[...viewPath]]/(components)/badge";
import { truncateString } from "../../lib/utils";
import { MockBlockData, MockTransactionsData } from "../../schemas/mock-data";
import BarChartIcon from "../../app/[network]/[type]/(standard)/[query]/[[...viewPath]]/(components)/(icons)/BarChartIcon";
import React, { useEffect, useState } from "react";
import { useMediaQuery } from "../../ecs/hooks/use-media-query";

type HeaderProps = {
  icon: React.ReactNode;
  title: string;
  buttonText?: string;
  handleClick?: () => void;
};
const TableHeader: React.FC<HeaderProps> = ({
  icon,
  title,
  buttonText,
  handleClick,
}) => {
  return (
    <div className="flex items-center justify-between">
      <h3 className="flex items-center justify-start gap-2 font-bold">
        {icon}
        {title}
      </h3>

      <button
        className="border rounded-lg py-1 px-2"
        type="button"
        onClick={() => handleClick?.()}
      >
        {buttonText ?? "View All"}
      </button>
    </div>
  );
};

export const BlocksAndTransactionsSummaryDisplay = () => {
  const isMobile = useMediaQuery("(max-width: 600px)");
  // const isMobile = true;
  return (
    <div className="w-full flex items-stretch justify-evenly gap-4 flex-wrap">
      <BlockSummaryTable /> <TransactionsSummaryTable />
    </div>
  );
};

interface TableSummaryProps {
  screenSize?: "mobile" | "others";
}

export const BlockSummaryTable = () => {
  return (
    <div className="flex-1 bg-white px-4 py-6 md:p-10 rounded-lg border border-mid-dark-100 lifting-shadow">
      <TableHeader icon={<BlocksIcon />} title="Latest Blocks" />
      <div className="w-full mt-8 md:hidden">
        <ul className="divide-y px-1 space-y-2">
          {MockBlockData.map((block) => (
            <li className="py-2" key={block.id}>
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-ocean">{block.height}</span>
                  <span className="text-[rgba(42,43,46,0.48)]">
                    12 secs ago
                  </span>
                </div>
                <Badge
                  long
                  text={`${block.blockreward.toLocaleString()} ZBC`}
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

      <table className="responsive border-collapse hidden sm:table w-full mt-8">
        <tbody>
          {MockBlockData.map((block) => {
            return (
              <tr
                key={block.id}
                className="border-b border-[rgba(8,6,21,0.06)]"
              >
                <td className="py-2">
                  <div className="flex flex-col">
                    <span className="text-ocean">{block.height}</span>
                    <span className="text-[mid-dark]">12 secs ago</span>
                  </div>
                </td>
                <td className="py-2">
                  <div>
                    miner:{" "}
                    <em className="text-ocean  not-italic">
                      {truncateString(block.minerAddress, 8, 8)}
                    </em>
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

export const TransactionsSummaryTable = () => {
  return (
    <div className="flex-1 bg-white px-4 py-6 md:p-10 rounded-lg border border-mid-dark-100 lifting-shadow">
      <TableHeader icon={<BarChartIcon />} title="Latest Transactions" />
      <div className="w-full mt-8 md:hidden">
        <ul className="divide-y px-1 space-y-2">
          {MockTransactionsData.map((transaction) => (
            <li key={transaction.id} className="py-2">
              <div className="flex items-center justify-between">
                <div className="flex flex-col gap-1">
                  <span className="text-ocean">
                    {truncateString(transaction.hash, 10, 0)}
                  </span>
                  <span className="text-[rgba(42,43,46,0.48)]">
                    12 secs ago
                  </span>
                </div>

                <Badge long text={`${transaction.amount} ZBC`} />
              </div>

              <div className="flex flex-col gap-1 mt-2">
                <span>
                  <span className="block">From: </span>
                  <em className="text-ocean not-italic">
                    {truncateString(transaction.from, 12, 12)}
                  </em>
                </span>
                <span>
                  To:{" "}
                  <em className="text-ocean not-italic">
                    {truncateString(transaction.recipient, 8, 8)}
                  </em>
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <table className="responsive border-collapse w-full mt-8 hidden md:table">
        <tbody>
          {MockTransactionsData.map((transaction) => {
            return (
              <tr
                key={transaction.id}
                className="border-b border-[rgba(8,6,21,0.06)]"
              >
                <td className="py-2">
                  <div className="flex flex-col gap-1">
                    <span className="text-ocean">
                      {truncateString(transaction.hash, 10, 0)}
                    </span>
                    <span className="text-[mid-dark]">12 secs ago</span>
                  </div>
                </td>
                <td className="py-2">
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
