import * as React from "react";
import Link from "next/link";
import { Card } from "~/ui/card";
import { cn } from "~/ui/shadcn/utils";
import { ArrowOut } from "~/ui/icons";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

export type BlockRow = {
  number: number;
  noOfTransactions: number;
  timestamp: number;
};

interface Props {
  className?: string;
  networkSlug: string;
  data: BlockRow[];
}

export function LatestBlocks({ className, data, networkSlug: network }: Props) {
  const allData = data.slice(0, 5);
  return (
    <Card className={cn(className, "p-0")}>
      <header className="flex items-center border-b border-mid-dark-100 p-3 justify-between">
        <p className="text-lg">Latest Blocks</p>
        <Link
          href={`/${network}/latest/blocks`}
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
      <ul className="flex flex-col">
        {allData.slice(0, 5).map((tr, index) => (
          <li key={tr.number} className="flex-1">
            <BlockRow
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

interface TransactionRowProps extends BlockRow {
  className?: string;
  network: string;
}
function BlockRow(props: TransactionRowProps) {
  dayjs.extend(relativeTime);

  return (
    <Link
      href={`/${props.network}/block/${props.number}`}
      className={cn(
        props.className,
        "h-full",
        "px-4 py-5 bg-white border-mid-dark-100 flex items-center gap-14 justify-between",
        "hover:bg-muted/5",
        "[&:not(:focus)]:border-b",
        "focus:border focus:border-primary outline-none",
        "transition duration-150",
      )}
    >
      <p>{props.number}</p>
      <p className="truncate">
        {props.noOfTransactions} transaction
        {props.noOfTransactions > 1 ? "s" : ""}
      </p>

      {/* 
        We render the time directly in the server because we are in edge runtime,
        and most of the time, the edge location is not far from the user
       */}
      <time
        dateTime={new Date(props.timestamp).toISOString()}
        className="flex-shrink-0 text-muted"
      >
        {dayjs(props.timestamp).fromNow()}
      </time>
    </Link>
  );
}
