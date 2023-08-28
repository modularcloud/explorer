import * as React from "react";
import type { SVGProps } from "react";
const SvgCheckOn = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <path
      stroke="#2A2B2E"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M11.5 4.707a5.5 5.5 0 1 0 4 5.293v-.5"
    />
    <path
      stroke="#2A2B2E"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m8.5 9.5 1.5 2s1.5-3 4.5-5"
    />
  </svg>
);
export default SvgCheckOn;
