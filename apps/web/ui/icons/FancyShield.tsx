import * as React from "react";
import type { SVGProps } from "react";
const SvgFancyShield = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 14 14"
    {...props}
  >
    <g clipPath="url(#FancyShield_svg__a)" filter="url(#FancyShield_svg__b)">
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M6.601 1.006a1.02 1.02 0 0 1 .798 0l4.229 1.795c.377.16.622.53.622.94v3.842a5.25 5.25 0 1 1-10.5 0V3.74c0-.41.245-.78.622-.94zM9.2 5.372c.174.168.18.445.012.619L6.683 8.616a.44.44 0 0 1-.63 0L4.789 7.303a.438.438 0 1 1 .63-.606l.95.985L8.58 5.384a.44.44 0 0 1 .618-.012"
        clipRule="evenodd"
      />
    </g>
    <defs>
      <clipPath id="FancyShield_svg__a">
        <path fill="#fff" d="M0 0h14v14H0z" />
      </clipPath>
      <filter
        id="FancyShield_svg__b"
        width={12.5}
        height={13.908}
        x={0.75}
        y={0.925}
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset dy={1} />
        <feGaussianBlur stdDeviation={0.5} />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix values="0 0 0 0 0.25098 0 0 0 0 0.768627 0 0 0 0 0.666667 0 0 0 0.24 0" />
        <feBlend
          in2="BackgroundImageFix"
          result="effect1_dropShadow_379_1100"
        />
        <feBlend
          in="SourceGraphic"
          in2="effect1_dropShadow_379_1100"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
);
export default SvgFancyShield;
