import * as React from "react";
import { SVGProps } from "react";
const SvgCloseOn = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={20}
    height={20}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect width={20} height={20} rx={6} fill="#2A2B2E" fillOpacity={0.05} />
    <path d="m6.5 6.5 7 7m0-7-7 7" stroke="#2A2B2E" strokeLinecap="round" />
  </svg>
);
export default SvgCloseOn;
