import * as React from "react";
import type { SVGProps } from "react";
const SvgArrowBottomRight = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 14 14"
    {...props}
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M10.208 10.208 3.792 3.792m6.854 1.31v4.96a.583.583 0 0 1-.584.584H4.523"
    />
  </svg>
);
export default SvgArrowBottomRight;
