import * as React from "react";
import Link from "next/link";
import { Card } from "~/ui/card";
import { cn } from "~/ui/shadcn/utils";
import { ArrowOut } from "~/ui/icons";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { ClientTime } from "~/ui/tables/time";

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
  const allData = React.useMemo(() => data.slice(0, 5), [data]);
  return (
    <Card className={cn(className, "p-0")}>
      <header className="flex items-center border-b border-mid-dark-100 px-4 py-2.5 justify-between">
        <p className="text-base">Latest Blocks</p>
        <Link
          href={`/${network}/blocks`}
          className={cn(
            "rounded-md border border-mid-dark-100 py-1.5 px-2",
            "focus:border-primary outline-none",
            "hover:bg-muted/5",
            "inline-flex items-center gap-2",
          )}
        >
          <span className="text-xs">View all</span>
          <ArrowOut className="flex-shrink-0" />
        </Link>
      </header>
      <ul className="flex flex-col text-xs">
        {allData.map((tr, index) => (
          <li key={tr.number} className="flex-1">
            <BlockRow
              {...tr}
              network={network}
              className={cn(
                index === 4 && "rounded-b-md [&:not(:focus)]:border-none",
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
      href={`/${props.network}/blocks/${props.number}`}
      className={cn(
        props.className,
        "h-full",
        "px-4 py-5 h-14 bg-white border-mid-dark-100 flex items-center justify-between",
        "hover:bg-muted/5",
        "[&:not(:focus)]:border-b",
        "focus:border focus:border-primary outline-none",
        "transition duration-150",
        "grid grid-cols-11 gap-2",
      )}
    >
      <p className="col-span-3">{props.number}</p>
      <p className="truncate col-span-4">
        {props.noOfTransactions} transaction
        {props.noOfTransactions > 1 ? "s" : ""}
      </p>

      <ClientTime
        time={props.timestamp}
        className="flex-shrink-0 text-muted col-span-4 text-end"
      />
    </Link>
  );
}
