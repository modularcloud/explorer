import * as React from "react";
import type { SVGProps } from "react";
const SvgArrowRightWithLine = (props: SVGProps<SVGSVGElement>) => (
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
      strokeWidth={1.5}
      d="m14.332 5.832 5.543 5.543a1 1 0 0 1 0 1.414l-5.543 5.543m5-6.25h-15.5"
    />
  </svg>
);
export default SvgArrowRightWithLine;
