import * as React from "react";
import type { SVGProps } from "react";
const SvgRedCross = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <circle cx={10} cy={10} r={6.5} stroke="#EF4444" />
    <path
      stroke="#EF4444"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m7.5 7.5 5 5M7.5 12.5l5-5"
    />
  </svg>
);
export default SvgRedCross;
