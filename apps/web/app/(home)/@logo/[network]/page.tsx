import { notFound } from "next/navigation";
import { getSingleNetwork } from "~/lib/network";
import type { FetchLoadArgs } from "~/lib/utils";

interface Props {
  params: Pick<FetchLoadArgs, "network">;
}
export default async function NetworkLogo(props: Props) {
  const network = await getSingleNetwork(props.params.network);
  if (!network) notFound();

  // TODO : use the css returned from the API
  const bgGradientCSS = `linear-gradient(90deg, #0F4EF7 -10.76%, #00D5E2 98.22%);`;

  return (
    <div className="flex flex-col gap-8 items-center">
      <small className="uppercase text-lg ">MODULAR CLOUD</small>

      <p className="font-logo text-5xl font-bold md:text-6xl capitalize">
        <span
          className="text-transparent bg-clip-text"
          style={{
            backgroundImage: bgGradientCSS,
          }}
        >
          {network.chainBrand}
        </span>
      </p>
    </div>
  );
}
