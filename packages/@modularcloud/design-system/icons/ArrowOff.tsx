import * as React from "react";
import { SVGProps } from "react";
const SvgArrowOff = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={20}
    height={20}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M10 3.5H5.5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2v-9a2 2 0 0 0-2-2H10ZM7.5 12.5l5-5m0 0h-4m4 0v4M7.5 12.5l5-5m0 0h-4m4 0v4"
      stroke="#888A90"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export default SvgArrowOff;
