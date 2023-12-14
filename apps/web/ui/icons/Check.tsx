import * as React from "react";
import type { SVGProps } from "react";
const SvgCheck = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    fill="none"
    {...props}
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M10 6.332 7 9.999 5.666 8.665m8.5-.666a6.167 6.167 0 1 1-12.333 0 6.167 6.167 0 0 1 12.333 0"
    />
  </svg>
);
export default SvgCheck;
