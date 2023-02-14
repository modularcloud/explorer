import { CircleButton } from "../circle-button";
import { CubesOn, ArrowOn } from "../../icons";

const entryLabels = [
  "Index",
  "Chain ID",
  "Height",
  "Status",
  "Time",
  "Fee",
  "Gas (used/wanted)",
  "Messages",
];
const entryData = [
  "Chain ID",
  "Transactions",
  "Height",
  "Block time",
  "Block time",
  "Gas (used/wanted)",
  "Block Round",
  "Transactions",
];

interface Props {
  type: string;
  entries?: Array<[key: string, value: string]>;
  badgeText?: string;
  badgeIcon?: string;
}

export function Card({ badgeText }: Props) {
  return (
    <div className="w-full border shadow-md rounded-lg">
      <div className="bg-slate-100">Transaction</div>
      <CircleButton>{badgeText}</CircleButton>
    </div>
  );
}
