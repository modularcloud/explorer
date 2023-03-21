import clsx from "clsx";

type Props = {
  text: string;
  extra?: number;
  long?: boolean;
};

export function Badge({ text, extra = 0, long }: Props) {
  const hasExtra = extra > 1;

  return (
    <div
      className={clsx(
        "flex gap-2 border rounded-[2.5rem] border-mid-dark-100 pl-3 py-[.1875rem] w-max",
        hasExtra ? "pr-[.1875rem]" : "pr-3"
      )}
    >
      <div className={clsx(!long && "max-w-[80px] truncate")}>
        {text}
      </div>
      {hasExtra ? (
        <div className="w-8 py-1 flex justify-center items-center bg-slate-100 text-[#80838D] rounded-2xl text-xs">
          +{extra}
        </div>
      ) : null}
    </div>
  );
}