import { notFound } from "next/navigation";
import { getAllNetworks, getSingleNetworkCached } from "~/lib/network";
import type { FetchLoadArgs } from "~/lib/shared-utils";

interface Props {
  params: Pick<FetchLoadArgs, "network">;
}
export default async function NetworkLogo(props: Props) {
  const network = await getSingleNetworkCached(props.params.network);
  if (!network) notFound();

  return (
    <div className="flex flex-col gap-8 items-center mt-44">
      <small className="uppercase text-lg ">MODULAR CLOUD</small>

      <p className="font-logo text-5xl font-medium md:text-6xl capitalize">
        <span
          className="text-transparent bg-clip-text"
          style={{
            backgroundImage: network.config.cssGradient,
          }}
        >
          {network.chainBrand}
        </span>
      </p>
    </div>
  );
}

export async function generateStaticParams() {
  const allNetworks = await getAllNetworks();
  return allNetworks.map((network) => ({ network: network.slug }));
}
