import { Badge } from "../badge";
import { truncateString } from "../../lib/utils";
import Web3 from "web3";
import Link from "next/link";
import { createModularCloud } from "@modularcloud/sdk";
import { ClientTime } from "./time";
import SvgBlocksIcon from "../icons/BlocksIcon";
import SvgBarChartIcon from "../icons/BarChartIcon";

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

      <Link href={href} className="rounded-lg border px-2 py-1">
        {buttonText ?? "View All"}
      </Link>
    </div>
  );
};

export const BlocksAndTransactionsSummaryDisplay = () => {
  // const isMobile = true;
  return (
    <div className="space-between flex w-full max-w-[76rem] flex-col items-stretch gap-6 lg:flex-row lg:gap-8">
      {/* @ts-expect-error Async Server Component */}
      <BlockSummaryTable /> <TransactionsSummaryTable />
    </div>
  );
};

interface TableSummaryProps {
  screenSize?: "mobile" | "others";
}

export const BlockSummaryTable = async () => {
  const web3 = new Web3("https://api.evm.zebec.eclipsenetwork.xyz/solana");
  const latestBlock = await web3.eth.getBlockNumber();
  const blockPromises = [];
  for (let i = 0; i < 8; i++) {
    const block = web3.eth.getBlock(latestBlock - i);
    blockPromises.push(block);
  }
  const blocks = await Promise.all(blockPromises);
  const blockData = blocks.map((block) => {
    return {
      height: block.number,
      minerAddress: block.miner,

      // from gwei to zbc
      blockreward: block.gasUsed / 1000000000,

      timestamp: Number(block.timestamp) * 1000,
    };
  });
  return (
    <div className="border-mid-dark-100 lifting-shadow flex-1 rounded-lg border bg-white px-4 py-6">
      <TableHeader
        href="/triton/latest/blocks/blocks"
        icon={<SvgBlocksIcon />}
        title="Latest Blocks"
      />
      <div className="mt-8 w-full md:hidden">
        <ul className="space-y-2 divide-y px-1">
          {blockData.map((block) => (
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

      <table className="responsive mt-8 hidden w-full border-collapse md:table">
        <tbody>
          {blockData.map((block) => {
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

export const TransactionsSummaryTable = async () => {
  const web3 = new Web3("https://api.evm.zebec.eclipsenetwork.xyz/solana");
  const mc = createModularCloud(process.env.EVM_CHAIN_DATA_SERVICE);
  const txRefs = await mc.evm.getRecentTransactions("triton", 8);
  async function getTransaction(hash: string, blockNumber: number) {
    const [tx, block] = await Promise.all([
      web3.eth.getTransaction(hash),
      web3.eth.getBlock(blockNumber),
    ]);
    return {
      hash: tx.hash,
      from: tx.from,
      recipient: tx.to,
      amount: Number(web3.utils.fromWei(tx.value)).toPrecision(3),
      timestamp: Number(block.timestamp) * 1000,
    };
  }
  const transactionData = await Promise.all(
    txRefs.txs.map((txRef) => getTransaction(txRef.hash, txRef.blockNumber)),
  );

  return (
    <div className="border-mid-dark-100 lifting-shadow flex-1 rounded-lg  border bg-white px-4 py-6">
      <TableHeader
        href="/triton/latest/transactions/transactions"
        icon={<SvgBarChartIcon />}
        title="Latest Transactions"
      />
      <div className="mt-8 w-full md:hidden">
        <ul className="space-y-2 divide-y px-1">
          {transactionData.map((transaction) => (
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

              <div className="mt-2 flex flex-col gap-1 whitespace-nowrap">
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

      <table className="responsive mt-8 hidden w-full border-collapse md:table">
        <tbody>
          {transactionData.map((transaction) => {
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
                <td className="py-2 text-right">
                  <div className="ml-auto w-fit">
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
