import * as React from "react";
import type { SVGProps } from "react";
const SvgArrowRightGradient = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 33 16"
    {...props}
  >
    <path
      fill="url(#ArrowRightGradient_svg__a)"
      fillRule="evenodd"
      d="M8.78 4.804a.75.75 0 0 0-1.06 1.06l2.136 2.137-2.136 2.136a.75.75 0 1 0 1.06 1.06l2.313-2.312a1.25 1.25 0 0 0 0-1.768zm4.667 0a.75.75 0 0 0-1.06 1.06l2.136 2.137-2.137 2.136a.75.75 0 1 0 1.061 1.06l2.313-2.312a1.25 1.25 0 0 0 0-1.768zm5 0a.75.75 0 1 0-1.061 1.06l2.136 2.137-2.136 2.136a.75.75 0 1 0 1.06 1.06l2.313-2.312a1.25 1.25 0 0 0 0-1.768zm4.666 0a.75.75 0 1 0-1.06 1.06l2.136 2.137-2.137 2.136a.75.75 0 1 0 1.061 1.06l2.313-2.312a1.25 1.25 0 0 0 0-1.768z"
      clipRule="evenodd"
    />
    <defs>
      <linearGradient
        id="ArrowRightGradient_svg__a"
        x1={25.75}
        x2={6.75}
        y1={8}
        y2={8}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="currentColor" />
        <stop offset={1} stopColor="currentColor" stopOpacity={0} />
      </linearGradient>
    </defs>
  </svg>
);
export default SvgArrowRightGradient;
