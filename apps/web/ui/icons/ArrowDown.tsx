import * as React from "react";
import type { SVGProps } from "react";
const SvgArrowDown = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <path
      fill="currentColor"
      d="m12 12.781 2.828-2.828a.667.667 0 1 1 .943.943l-3.064 3.064a1 1 0 0 1-1.415 0l-3.064-3.064a.667.667 0 0 1 .943-.943z"
    />
  </svg>
);
export default SvgArrowDown;
