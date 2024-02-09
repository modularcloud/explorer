import * as React from "react";
import type { SVGProps } from "react";
const SvgFilters = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 16 16"
    {...props}
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M3.8 2.497v4.169m0 2.5v4.336M8 2.664V7.5M8 10v3.335m4.199-10.837v2.834m0 2.5v5.67m-9.702-6.67h2.67m1.5 3.002h2.666m1.5-4.335H13.5"
    />
  </svg>
);
export default SvgFilters;
