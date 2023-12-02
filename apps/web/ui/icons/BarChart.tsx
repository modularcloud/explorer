import * as React from "react";
import type { SVGProps } from "react";
const SvgBarChart = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <path
      stroke="currentColor"
      strokeLinecap="square"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M5 13.777a1 1 0 0 0-1 1V19a1 1 0 0 0 1 1h1.33a1 1 0 0 0 1-1v-4.223a1 1 0 0 0-1-1H5ZM11.33 9.334a1 1 0 0 0-1 1v8.667a1 1 0 0 0 1 1h1.33a1 1 0 0 0 1-1v-8.667a1 1 0 0 0-1-1h-1.33ZM17.67 4a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1H19a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1z"
    />
  </svg>
);
export default SvgBarChart;
