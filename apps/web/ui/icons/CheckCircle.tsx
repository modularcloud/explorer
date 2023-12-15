import * as React from "react";
import type { SVGProps } from "react";
const SvgCheckCircle = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={14}
    height={14}
    fill="none"
    {...props}
  >
    <path
      fill="currentColor"
      d="M7 13.667A6.667 6.667 0 1 1 7 .334a6.667 6.667 0 0 1 0 13.333M5.628 8.96a1 1 0 0 0 1.414 0l3.535-3.535a.667.667 0 1 0-.942-.943l-3.3 3.3L4.92 6.367a.667.667 0 1 0-.943.943z"
    />
  </svg>
);
export default SvgCheckCircle;
