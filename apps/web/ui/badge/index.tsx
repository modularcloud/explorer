import clsx from "clsx";
import SvgArrowOn from "../icons/ArrowOn";

type Props = {
  text: string;
  extra?: number;
  long?: boolean;
  icon?: boolean;
  toggled?: boolean;
};

export function Badge({ text, extra = 0, long, icon, toggled }: Props) {
  const hasExtra = extra > 0;

  return (
    <div
      className={clsx(
        toggled ? "border-ocean-700" : "border-mid-dark-100",
        "flex items-center gap-2 whitespace-nowrap rounded-[2.5rem] border bg-white py-[.1875rem] pl-3",
        long ? "max-w-min" : "w-max",
        hasExtra ? "pr-[.1875rem]" : "pr-3",
      )}
    >
      {icon ? (
        <div className="w-5">
          <SvgArrowOn />
        </div>
      ) : null}
      <div className={clsx(long ? "max-w-min" : "max-w-[80px]", "truncate")}>
        {text}
      </div>
      {hasExtra ? (
        <div className="flex w-8 items-center justify-center rounded-2xl bg-slate-100 py-1 text-xs text-[#80838D]">
          +{extra}
        </div>
      ) : null}
    </div>
  );
}
