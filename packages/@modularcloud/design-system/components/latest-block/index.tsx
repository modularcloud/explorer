import Link from "next/link";

interface Props {
  block: number;
}

export const LatestBlock = ({ block }: Props) => {
  return (
    <div className="mt-6 sm:hidden block">
      <span className="font-bold mx-3">Latest Block</span> /
      <span className="mx-3">{block}</span>
    </div>
  );
};
