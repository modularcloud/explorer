import * as React from "react";
import Link from "next/link";
import { Card } from "~/ui/card";
import { cn } from "~/ui/shadcn/utils";
import { ArrowOut, CheckCircle, XCircle } from "~/ui/icons";

interface Props {
  className?: string;
  data: TransactionRow[];
  networkSlug: string;
}

export function LatestTransactions({
  className,
  data,
  networkSlug: network,
}: Props) {
  const allData = data.slice(0, 5);
  return (
    <Card className={cn(className, "p-0")}>
      <header className="flex items-center border-b border-mid-dark-100 p-3 justify-between">
        <p className="text-lg">Latest Transactions</p>
        <Link
          href={`/${network}/transactions`}
          className={cn(
            "rounded-md border border-mid-dark-100 py-2 px-3",
            "focus:border-primary outline-none",
            "hover:bg-muted/5",
            "inline-flex items-center gap-2",
          )}
        >
          <span className="text-sm">View all</span>
          <ArrowOut className="flex-shrink-0" />
        </Link>
      </header>
      <ul className="flex flex-col max-h-full overflow-auto">
        {allData.slice(0, 5).map((tr, index) => (
          <li key={tr.hash}>
            <TransactionRow
              {...tr}
              network={network}
              className={cn(
                index === 4 && "focus:rounded-b-md [&:not(:focus)]:border-none",
              )}
            />
          </li>
        ))}
      </ul>
    </Card>
  );
}

export type TransactionRow = {
  hash: string;
  success: boolean;
  type: string;
};

interface TransactionRowProps extends TransactionRow {
  className?: string;
  network: string;
}
function TransactionRow(props: TransactionRowProps) {
  return (
    <Link
      href={`/${props.network}/transactions/${props.hash}`}
      className={cn(
        props.className,
        "p-4 bg-white border-mid-dark-100 flex items-center gap-14 justify-between",
        "hover:bg-muted/5",
        "[&:not(:focus)]:border-b",
        "focus:border focus:border-primary outline-none",
        "transition duration-150",
      )}
    >
      <div className="flex items-center gap-4 overflow-hidden">
        {props.success ? (
          <CheckCircle className="h-5 w-5 flex-shrink-0 text-teal-500" />
        ) : (
          <XCircle className="h-5 w-5 flex-shrink-0 text-red-500" />
        )}
        <p className="truncate">{props.hash}</p>
      </div>
      <span className="py-1 px-3 rounded-md border border-mid-dark-100 flex-shrink-0">
        {props.type}
      </span>
    </Link>
  );
}
