import * as React from "react";
import type { SVGProps } from "react";
const SvgXLogo = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 16 16"
    {...props}
  >
    <path
      fill="currentColor"
      d="M5.333 1.333H.667l5.507 7.343-5.207 5.99h1.766l4.26-4.899 3.674 4.9h4.666L9.595 7.014l4.938-5.682h-1.766l-3.99 4.59zm6 12-8-10.667h1.334l8 10.667z"
    />
  </svg>
);
export default SvgXLogo;
