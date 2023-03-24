import clsx from "clsx";
import { ArrowOn } from "../../icons";

type Props = {
  list: string[];
  long?: boolean;
  icon?: boolean;
  toggled?: boolean;
};

export function Badge({ list, long, icon, toggled }: Props) {
  const count = list?.length ?? 0;
  const hasExtra = count > 1;

  if (count === 0) {
    return null;
  }

  return (
    <div
      className={clsx(
        toggled ? "border-ocean-700" : "border-mid-dark-100",
        "bg-white flex gap-2 border rounded-[2.5rem] pl-3 py-[.1875rem] items-center",
        long ? "max-w-min" : "w-max",
        hasExtra ? "pr-[.1875rem]" : "pr-3"
      )}
    >
      {icon ? (
        <div className="w-5">
          <ArrowOn />
        </div>
      ) : null}
      <div className={clsx(long ? "max-w-min" : "max-w-[80px]", "truncate")}>
        {list[count - 1]}
      </div>
      {hasExtra ? (
        <div className="w-8 py-1 flex justify-center items-center bg-slate-100 text-[#80838D] rounded-2xl text-xs">
          +{count - 1}
        </div>
      ) : null}
    </div>
  );
}
