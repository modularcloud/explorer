import * as React from "react";
import { SVGProps } from "react";
const SvgEyeOff = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={20}
    height={20}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M17.5 10s-2 5.5-7.5 5.5S2.5 10 2.5 10s2-5.5 7.5-5.5 7.5 5.5 7.5 5.5Z"
      stroke="#888A90"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle
      cx={10}
      cy={10}
      r={2.5}
      fill="#888A90"
      fillOpacity={0.1}
      stroke="#888A90"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export default SvgEyeOff;
