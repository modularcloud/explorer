/* eslint-disable @next/next/no-img-element */
import { DEFAULT_URL, SIZE } from "~/app/api/og/utils";
import { getSingleNetworkCached } from "~/lib/network";

export type OpenGraphHomeProps = {
  networkSlug: string;
};

export async function OpenGraphHome({ networkSlug }: OpenGraphHomeProps) {
  const network = await getSingleNetworkCached(networkSlug);

  if (!network) return null;

  const primaryColor = `hsl(${network.config.primaryColor})`;
  console.log({
    default: DEFAULT_URL,
    url: new URL("/images/og-grid.png", DEFAULT_URL).toString(),
  });
  return (
    <div
      style={{
        background: "linear-gradient(180deg, #0D0D12 0%, #000 100%)",
        height: `${SIZE.height}px`,
      }}
      tw="relative w-full text-white flex flex-col items-center pt-[150px]"
    >
      <img
        src={new URL("/images/og-grid.png", DEFAULT_URL).toString()}
        alt=""
        width={SIZE.width}
        height={SIZE.height}
        tw="absolute inset-0"
      />

      {/* Top logo */}
      <div tw="relative flex items-center justify-center h-[138px] w-[138px]">
        <img
          src={network.config.logoUrl}
          alt=""
          width={120}
          height={120}
          tw="relative z-20 h-[120px] w-[120px] rounded-full"
          style={{
            filter: network.brand === "eclipse" ? "invert(1)" : "none",
          }}
        />

        <LogoBox tw="z-10 absolute inset-0" strokeColor={primaryColor} />
      </div>

      {/* Title & subtitle */}
      <div tw="flex flex-col items-center mb-28">
        <h1 tw="font-medium text-[9rem] capitalize mb-1">{network.brand}</h1>
        <h2 tw="font-medium text-4xl">
          {network.brand === "celestia" || network.brand === "dymension"
            ? "Ecosystem"
            : "Block"}
          &nbsp;Explorer
        </h2>
      </div>

      {/* Modularcloud Brand */}
      <div
        tw="flex flex-col items-center mb-10"
        style={{
          gap: "10px",
        }}
      >
        <div
          tw="h-[1px] w-[400px]"
          style={{
            background:
              "linear-gradient(90deg, rgba(13, 13, 18, 0.00) 0%, rgba(255, 255, 255, 0.56) 51.5%, rgba(13, 13, 18, 0.00) 100%)",
          }}
        />
        <div
          tw="flex items-center"
          style={{
            gap: "24px",
          }}
        >
          <MCLogo
            style={{
              width: "50px",
              height: "50px",
            }}
          />
          <h3 tw="font-medium text-4xl relative bottom-1">Modular Cloud</h3>
        </div>
        <div
          tw="h-[1px] w-[400px]"
          style={{
            background:
              "linear-gradient(90deg, rgba(13, 13, 18, 0.00) 0%, rgba(255, 255, 255, 0.56) 51.5%, rgba(13, 13, 18, 0.00) 100%)",
          }}
        />
      </div>

      {/* Random text at the bottom */}
      <div
        tw="flex items-center opacity-40"
        style={{
          gap: "14px",
        }}
      >
        <span>4</span>
        <span>D</span>
        <span>2</span>
        <span>A</span>
        <span>4</span>
        <span>D</span>
        <span>2</span>
        <span>4</span>
      </div>
    </div>
  );
}

function LogoBox(
  props: React.SVGProps<SVGSVGElement> & { tw?: string; strokeColor: string },
) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={138}
      height={138}
      fill="none"
      {...props}
    >
      <path
        stroke={props.strokeColor}
        strokeOpacity={0.13}
        d="M1 1v137h136V1H1Z"
      />
    </svg>
  );
}

function MCLogo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 60 61"
      fill="none"
      {...props}
    >
      <g filter="url(#a)">
        <g filter="url(#b)">
          <path
            fill="#fff"
            fillRule="evenodd"
            d="M8.932 48.02C32.041 44.892 50.39 26.546 53.52 3.434A2.581 2.581 0 0 0 50.964.502H8.58A2.579 2.579 0 0 0 6 3.082v42.384a2.581 2.581 0 0 0 2.932 2.555Zm45.065-2.102V30.776v.001c0-1.141-1.478-1.599-2.118-.654A60.858 60.858 0 0 1 35.623 46.38c-.944.64-.487 2.118.655 2.118h15.14a2.58 2.58 0 0 0 2.58-2.58Z"
            clipRule="evenodd"
          />
        </g>
        <path
          fill="#fff"
          fillRule="evenodd"
          d="M8.932 48.02C32.041 44.892 50.39 26.546 53.52 3.434A2.581 2.581 0 0 0 50.964.502H8.58A2.579 2.579 0 0 0 6 3.082v42.384a2.581 2.581 0 0 0 2.932 2.555Zm45.065-2.102V30.776v.001c0-1.141-1.478-1.599-2.118-.654A60.858 60.858 0 0 1 35.623 46.38c-.944.64-.487 2.118.655 2.118h15.14a2.58 2.58 0 0 0 2.58-2.58Z"
          clipRule="evenodd"
          style={{
            mixBlendMode: "screen",
          }}
        />
      </g>
      <defs>
        <filter
          id="a"
          width={59.997}
          height={59.996}
          x={0}
          y={0.502}
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dy={6} />
          <feGaussianBlur stdDeviation={3} />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.18 0" />
          <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_253_3" />
          <feBlend
            in="SourceGraphic"
            in2="effect1_dropShadow_253_3"
            result="shape"
          />
        </filter>
        <filter
          id="b"
          width={47.997}
          height={53.996}
          x={6}
          y={0.502}
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dy={6} />
          <feGaussianBlur stdDeviation={6} />
          <feComposite in2="hardAlpha" k2={-1} k3={1} operator="arithmetic" />
          <feColorMatrix values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.25 0" />
          <feBlend in2="shape" result="effect1_innerShadow_253_3" />
        </filter>
      </defs>
    </svg>
  );
}
