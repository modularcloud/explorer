import * as React from "react";
import type { SVGProps } from "react";
const SvgArrowOut = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={9}
    height={8}
    fill="none"
    {...props}
  >
    <path
      fill="currentColor"
      d="M6.67 2.276 1.402 7.542A.667.667 0 0 1 .46 6.6l5.266-5.267h-4.39a.667.667 0 1 1 0-1.333h5.667a1 1 0 0 1 1 1v5.667a.667.667 0 0 1-1.334 0v-4.39Z"
    />
  </svg>
);
export default SvgArrowOut;
