import { HomeBg } from "~/ui/home-bg";
import { HomeBgMobile } from "~/ui/home-bg/mobile";

import { notFound } from "next/navigation";
import { getAllPaidNetworks, getSingleNetworkCached } from "~/lib/network";

import type { HeadlessRoute } from "~/lib/headless-utils";
interface Props {
  params: Pick<HeadlessRoute, "network">;
}
export default async function NetworkLogo(props: Props) {
  const network = await getSingleNetworkCached(props.params.network);
  if (!network) notFound();

  return (
    <div
      className="flex flex-col gap-8 items-center pt-44"
      style={{
        // @ts-expect-error this is a CSS variable
        "--color-primary": network.config.primaryColor,
      }}
    >
      <HomeBg className="absolute left-0 top-0 right-0 hidden tab:block z-[-1]" />
      <HomeBgMobile className="absolute left-0 top-0 right-0 tab:hidden block z-[-1]" />

      <small className="uppercase text-xs border rounded-full px-3 py-1.5 bg-white tracking-[0.105rem]">
        MODULAR CLOUD
      </small>

      <h1
        className="font-logo text-5xl font-medium md:text-6xl capitalize text-transparent bg-clip-text"
        style={{
          backgroundImage: network.config.cssGradient,
        }}
      >
        {network.chainBrand}
      </h1>
    </div>
  );
}

export async function generateStaticParams() {
  const paidNetworks = await getAllPaidNetworks();
  return paidNetworks.map((network) => ({ network: network.slug }));
}
