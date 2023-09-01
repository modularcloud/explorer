import * as React from "react";
import type { SVGProps } from "react";
const SvgCardView = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <path
      stroke="#888A90"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M14.5 6.5h-9a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2Z"
    />
    <path
      fill="#888A90"
      fillOpacity={0.1}
      stroke="#888A90"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M13.059 3.5H6.942a2 2 0 0 0-1.898 1.368L4.5 6.5h11l-.544-1.632A2 2 0 0 0 13.059 3.5Z"
    />
  </svg>
);
export default SvgCardView;
