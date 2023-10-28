import * as React from "react";
import type { SVGProps } from "react";
const SvgBellOn = (props: SVGProps<SVGSVGElement>) => (
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
      d="M7.5 13.5h-3l1-3V9A4.5 4.5 0 0 1 10 4.5v0A4.5 4.5 0 0 1 14.5 9v1.5l1 3h-3m-5 0v0a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v0m-5 0h5"
    />
  </svg>
);
export default SvgBellOn;
