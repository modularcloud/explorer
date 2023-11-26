import * as React from "react";
import type { SVGProps } from "react";
const SvgListViewOn = (props: SVGProps<SVGSVGElement>) => (
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
      d="M10 16.5h5.5a1 1 0 1 0 0-2h-11a1 1 0 1 0 0 2z"
    />
    <path
      fill="#2A2B2E"
      fillOpacity={0.2}
      stroke="#2A2B2E"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M10 11.5h5.5a1 1 0 0 0 1-1v-1a1 1 0 0 0-1-1h-11a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1z"
    />
    <path
      stroke="#2A2B2E"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M10 5.5h5.5a1 1 0 1 0 0-2h-11a1 1 0 0 0 0 2z"
    />
  </svg>
);
export default SvgListViewOn;
