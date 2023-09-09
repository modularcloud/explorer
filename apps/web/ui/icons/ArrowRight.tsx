import * as React from "react";
import type { SVGProps } from "react";
const SvgArrowRight = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={6}
    height={8}
    fill="none"
    {...props}
  >
    <path
      fill="currentColor"
      d="M3.78 4 .952 1.172a.667.667 0 0 1 .943-.943l3.064 3.064a1 1 0 0 1 0 1.415L1.895 7.772a.667.667 0 0 1-.943-.943L3.78 4Z"
    />
  </svg>
);
export default SvgArrowRight;