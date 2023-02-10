import * as React from "react";
import { SVGProps } from "react";
const SvgCubesOff = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={20}
    height={20}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M10 3.5H5.5a2 2 0 0 0-2 2V10M10 3.5h4.5a2 2 0 0 1 2 2V10M10 3.5v13m0 0h4.5a2 2 0 0 0 2-2V10M10 16.5H5.5a2 2 0 0 1-2-2V10m0 0h13"
      stroke="#888A90"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M14.5 3.5H10V10h6.5V5.5a2 2 0 0 0-2-2Z"
      fill="#888A90"
      fillOpacity={0.1}
      stroke="#888A90"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export default SvgCubesOff;
