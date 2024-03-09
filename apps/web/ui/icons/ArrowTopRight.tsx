import * as React from "react";
import type { SVGProps } from "react";
const SvgArrowTopRight = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 14 14"
    {...props}
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="m10.208 3.792-6.416 6.416m1.31-6.854h4.96c.323 0 .584.261.584.584v5.539"
    />
  </svg>
);
export default SvgArrowTopRight;
