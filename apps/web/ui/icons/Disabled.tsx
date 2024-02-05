import * as React from "react";
import type { SVGProps } from "react";
const SvgDisabled = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth={2}
      d="M18.364 5.636A9 9 0 1 0 5.636 18.364M18.364 5.636A9 9 0 1 1 5.636 18.364M18.364 5.636 5.636 18.364"
    />
  </svg>
);
export default SvgDisabled;
