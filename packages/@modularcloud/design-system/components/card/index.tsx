import clsx from "clsx";
import { Badge } from "../badge";

interface Props {
  type: string;
  entries?: Array<[key: string, value: string]>;
  badgeText?: string;
  children?: React.ReactNode;
  navTo?: () => void;
}

export function Card({ type, badgeText, children, navTo }: Props) {
  return (
    <div className="w-full border border-mid-dark-100 shadow-[0px_3px_6px_rgba(42,43,46,_0.07),0px_1px_2px_rgba(42,43,46,0.04)] rounded-xl lg:w-[42rem] xl:w-[48rem] 2xl:w-[56rem]">
      <div className="px-4 py-1.5 font-bold bg-slate/[.04] border-b border-slate-100">
        {type}
      </div>
      <div className="py-2 px-4">
        <div onClick={navTo} className={clsx(navTo && "cursor-pointer", "pt-2 pb-4")}>
          <Badge icon={!!navTo} long={true} list={[badgeText ?? "Unknown"]} />
        </div>
        {children}
      </div>
    </div>
  );
}
