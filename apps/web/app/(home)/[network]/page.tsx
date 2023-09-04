import { FetchLoadArgs } from "~/lib/utils";

interface Props {
  params: Pick<FetchLoadArgs, "network">;
}
export default function NetworkLogo({ params }: Props) {
  return <>Widget Network</>;
}
