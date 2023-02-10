import * as React from "react";
import { SVGProps } from "react";
const SvgCopyOn = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={20}
    height={20}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M8 3.5H5.5a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h5a2 2 0 0 0 2-2v-5a2 2 0 0 0-2-2H8Z"
      fill="#888A90"
      fillOpacity={0.2}
      stroke="#2A2B2E"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M14.5 7.5v0a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-5a2 2 0 0 1-2-2v0"
      stroke="#2A2B2E"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export default SvgCopyOn;
