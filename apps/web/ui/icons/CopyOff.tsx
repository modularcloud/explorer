import * as React from "react";
import type { SVGProps } from "react";
const SvgCopyOff = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <path
      fill="#888A90"
      fillOpacity={0.1}
      stroke="#888A90"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M8 3.5H5.5a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h5a2 2 0 0 0 2-2v-5a2 2 0 0 0-2-2z"
    />
    <path
      stroke="#888A90"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M14.5 7.5a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-5a2 2 0 0 1-2-2v0"
    />
  </svg>
);
export default SvgCopyOff;
