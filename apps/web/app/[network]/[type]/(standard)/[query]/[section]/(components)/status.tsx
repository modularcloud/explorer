import clsx from "clsx";
import SvgGreenTick from "../../../../../../../ui/icons/GreenTick";
import SvgRedCross from "../../../../../../../ui/icons/RedCross";

type Props = {
  children?: React.ReactNode;
  status: boolean;
  mode?: string;
};

export function Status({ children, status, mode }: Props) {
  return mode === "icon" ? (
    status ? (
      <SvgGreenTick />
    ) : (
      <SvgRedCross />
    )
  ) : (
    <div
      className={clsx(
        "flex gap-2 items-center",
        status ? "text-specialty-green" : "text-specialty-red"
      )}
    >
      {status ? <SvgGreenTick /> : <SvgRedCross />}
      {children ?? (status ? "Success" : "Failure")}
    </div>
  );
}