import * as React from "react";
import { SVGProps } from "react";
const SvgListView = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={20}
    height={20}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M10 3.5H5.5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2v-9a2 2 0 0 0-2-2H10Z"
      stroke="#888A90"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M14.5 3.5h-9a2 2 0 0 0-2 2V10h13V5.5a2 2 0 0 0-2-2Z"
      fill="#888A90"
      fillOpacity={0.1}
      stroke="#888A90"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M3.5 10h13M6.5 7h4M6.5 13h7"
      stroke="#888A90"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export default SvgListView;
