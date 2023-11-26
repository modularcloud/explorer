import * as React from "react";
import type { SVGProps } from "react";
const SvgMoonOn = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <path
      fill="#888A90"
      fillOpacity={0.2}
      stroke="#2A2B2E"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M16.093 11.351a5.5 5.5 0 0 1-7.445-7.445 5.933 5.933 0 1 0 7.445 7.445"
    />
    <path
      fill="#2A2B2E"
      stroke="#2A2B2E"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M11.5 6.5c2 0 2-3 2-3s0 3 2 3c-2 0-2 3-2 3s0-3-2-3"
    />
  </svg>
);
export default SvgMoonOn;
