import clsx from "clsx";
import SvgArrowOn from "./(icons)/ArrowOn";

type Props = {
  text: string;
  extra?: number;
  long?: boolean;
  icon?: boolean;
  toggled?: boolean;
};

export function Badge({ text, extra = 0, long, icon, toggled }: Props) {
  const hasExtra = extra > 1;

  return (
    <div
      className={clsx(
        toggled ? "border-ocean-700" : "border-mid-dark-100",
        "bg-white flex gap-2 border rounded-[2.5rem] pl-3 py-[.1875rem] items-center whitespace-nowrap",
        long ? "max-w-min" : "w-max",
        hasExtra ? "pr-[.1875rem]" : "pr-3"
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
        <div className="w-8 py-1 flex justify-center items-center bg-slate-100 text-[#80838D] rounded-2xl text-xs">
          +{extra}
        </div>
      ) : null}
    </div>
  );
}