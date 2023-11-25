import * as React from "react";
import type { SVGProps } from "react";
const SvgLoading = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <path
      stroke="#888A90"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeOpacity={0.24}
      d="M16.5 10a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0"
    />
    <path
      stroke="url(#Loading_svg__a)"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M10 3.5a6.5 6.5 0 0 1 6.5 6.5"
    />
    <defs>
      <linearGradient
        id="Loading_svg__a"
        x1={17}
        x2={13}
        y1={9}
        y2={3.5}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#888A90" />
        <stop offset={1} stopColor="#888A90" stopOpacity={0} />
      </linearGradient>
    </defs>
  </svg>
);
export default SvgLoading;
