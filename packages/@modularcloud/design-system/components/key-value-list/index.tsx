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
      <div className="flex flex-col flex-1 space-y-4">
        {entries?.map((entry, idx) => (
          <div className="flex flex-row space-x-5">
            <label className="w-1/2 font-bold truncate">
              {entryLabels[idx]}
            </label>
            <span key={entry[0]} className="w-1/2 truncate">
              {entry[1]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
