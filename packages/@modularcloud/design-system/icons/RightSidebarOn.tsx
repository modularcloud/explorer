import * as React from "react";
import { SVGProps } from "react";
const SvgRightSidebarOn = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={20}
    height={20}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M10 3.5H5.5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2v-9a2 2 0 0 0-2-2H10Z"
      stroke="#2A2B2E"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M14.5 3.5h-2v13h2a2 2 0 0 0 2-2v-9a2 2 0 0 0-2-2Z"
      fill="#2A2B2E"
      fillOpacity={0.1}
      stroke="#2A2B2E"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="m9.5 8.5-2 1.5 2 1.5"
      stroke="#2A2B2E"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export default SvgRightSidebarOn;
