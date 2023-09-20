import type { FetchLoadArgs } from "~/lib/utils";

interface Props {
  params: FetchLoadArgs;
}
export default function Page({ params: { network, type, query } }: Props) {
  return <h1 className="text-xl font-bold">{`${network}/${type}/${query}`}</h1>;
}
