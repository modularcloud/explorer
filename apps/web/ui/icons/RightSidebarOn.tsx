import * as React from "react";
import type { SVGProps } from "react";
const SvgRightSidebarOn = (props: SVGProps<SVGSVGElement>) => (
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
      d="M10 3.5H5.5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2v-9a2 2 0 0 0-2-2z"
    />
    <path
      fill="#2A2B2E"
      fillOpacity={0.1}
      stroke="#2A2B2E"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M14.5 3.5h-2v13h2a2 2 0 0 0 2-2v-9a2 2 0 0 0-2-2"
    />
    <path
      stroke="#2A2B2E"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m9.5 8.5-2 1.5 2 1.5"
    />
  </svg>
);
export default SvgRightSidebarOn;
