import { FetchLoadArgs } from "~/lib/utils";

interface Props {
  params: Pick<FetchLoadArgs, "network">;
}
export function NetworkLogo({ params }: Props) {
  return <>Logo Network</>;
}
