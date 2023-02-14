import clsx from "clsx";

interface Props {
  header?: string;
  entries?: Array<[key: string, value: string]>;
}

export function KeyValueList({ header, entries }: Props) {
  const entryLabels = [
    "Chain ID",
    "Transactions",
    "Height",
    "Block time",
    "Block time",
    "Gas (used/wanted)",
    "Block Round",
    "Transactions",
  ];

  return (
    <div className="flex flex-col w-full space-y-4">
      <span className={clsx("font-bold", { hidden: !header })}>{header}</span>
      <div className="flex w-full space-x-3">
        <div className="flex flex-col flex-1 space-y-4">
          {entryLabels.map((label, idx) => (
            <span
              key={idx}
              className="flex-1 font-bold overflow-hidden text-ellipsis"
            >
              {label}
            </span>
          ))}
        </div>
        <div className="flex flex-col flex-1 space-y-4">
          {entries?.map((entry) => (
            <span
              key={entry[0]}
              className="flex flex-nowrap overflow-hidden text-ellipsis"
            >
              {entry[1]}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
