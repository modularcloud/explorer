import * as React from "react";
import type { SVGProps } from "react";
const SvgClock = (props: SVGProps<SVGSVGElement>) => (
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
      d="M8 5.166V8l1.834 1.833M14.167 8A6.167 6.167 0 1 1 1.834 8a6.167 6.167 0 0 1 12.333 0"
    />
  </svg>
);
export default SvgClock;
