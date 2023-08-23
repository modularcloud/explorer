import * as React from "react";
import type { SVGProps } from "react";
const SvgArrowOn = (props: SVGProps<SVGSVGElement>) => (
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
      d="M10 3.5H5.5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2v-9a2 2 0 0 0-2-2H10ZM7.5 12.5l5-5m0 0h-4m4 0v4M7.5 12.5l5-5m0 0h-4m4 0v4"
    />
  </svg>
);
export default SvgArrowOn;
