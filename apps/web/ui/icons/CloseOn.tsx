import * as React from "react";
import type { SVGProps } from "react";
const SvgCloseOn = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <rect width={20} height={20} fill="#2A2B2E" fillOpacity={0.05} rx={6} />
    <path stroke="#2A2B2E" strokeLinecap="round" d="m6.5 6.5 7 7m0-7-7 7" />
  </svg>
);
export default SvgCloseOn;
