"use client";
import { Card } from "~/ui/card";
import { useGroupedNetworksContext } from "~/ui/grouped-networks-context";
import Image from "next/image";
import { capitalize, getEcosystemSVGLogoSRC } from "~/lib/shared-utils";
import { Button } from "~/ui/button";
import { LinkOut } from "~/ui/icons";

type Props = {
  ecosystem: string;
};

export function EcosystemCard({ ecosystem }: Props) {
  const allNetworkChains = useGroupedNetworksContext();
  const ecosystemChain = allNetworkChains
    .flat()
    .find((network) => network.slug === ecosystem);

  if (!ecosystemChain) {
    return null;
  }

  return (
    <Card
      as="section"
      className="flex flex-1 relative flex-col p-6 gap-4 items-start justify-between overflow-hidden"
    >
      <Image
        alt=""
        width={352}
        height={352}
        aria-hidden="true"
        src={getBigLogoSrc(ecosystemChain.brandName)!}
        className="object-center object-contain absolute right-0 top-1/2 translate-x-2/3 md:translate-x-1/3 -translate-y-1/2"
      />
      <div className="flex flex-col gap-4 items-start">
        <div
          className="rounded-md p-1.5 flex flex-none items-center justify-center border border-primary"
          style={{
            "--color-primary": ecosystemChain.brandColor,
            backgroundImage: ecosystemChain.brandCSSGradient.replaceAll(
              ";",
              "",
            ),
          }}
        >
          <Image
            src={getEcosystemSVGLogoSRC(ecosystemChain.brandName)!}
            className="w-4 h-4 object-contain object-center rounded-full"
            width={16}
            height={16}
            alt={`${ecosystemChain.brandName} logo`}
          />
        </div>
        <div className="flex flex-col gap-2 z-10">
          <h2 className="text-xl gap-1.5 flex items-baseline font-medium">
            <span
              className="text-transparent bg-clip-text"
              style={{
                backgroundImage: ecosystemChain.brandCSSGradient,
              }}
            >
              {capitalize(ecosystemChain.brandName)}
            </span>
            <span className="text-gray-900">Ecosystem</span>
          </h2>

          <p className="z-10 text-sm text-muted">
            {ecosystemChain.description}
          </p>
        </div>
      </div>

      <div>
        <Button
          className="px-3 py-1.5 shadow-sm bg-white text-xs text-muted items-center gap-1"
          variant="bordered"
          target="_blank"
          href={`/${ecosystem}`}
        >
          <span>Explore {capitalize(ecosystemChain.displayName)}</span>
          <LinkOut className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
}

function getBigLogoSrc(ecosystemBrand: string) {
  switch (ecosystemBrand) {
    case "dymension":
      return "/images/logo-dymension-hollow.png";
    case "celestia":
      return "/images/logo-celestia-hollow.png";
    default:
      return null;
  }
}
