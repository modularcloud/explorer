import * as React from "react";
import type { SVGProps } from "react";
const SvgCalendarTime = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8 5V3m8 2V3m4 5.5V5H4v15h4.5m8.5-5v2l1.5 1.5m-3.413-6.118a4.998 4.998 0 1 1 3.826 9.236 4.998 4.998 0 0 1-3.826-9.236"
    />
  </svg>
);
export default SvgCalendarTime;
