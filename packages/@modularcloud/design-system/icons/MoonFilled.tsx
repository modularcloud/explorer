import * as React from "react";
import { SVGProps } from "react";
const SvgMoonFilled = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={20}
    height={20}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M16.093 11.351a5.5 5.5 0 0 1-7.445-7.445 5.933 5.933 0 1 0 7.445 7.445ZM11.5 6.5c2 0 2-2 2-2s0 2 2 2c-2 0-2 2-2 2s0-2-2-2Z"
      fill="#2A2B2E"
      stroke="#2A2B2E"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export default SvgMoonFilled;
