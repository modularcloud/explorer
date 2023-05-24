import * as React from "react";
import { SVGProps } from "react";

const SvgThreeDotsHorizontal = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      cx="12"
      cy="12"
      r="1"
      stroke="#4a4e59"
      stroke-width="2"
      stroke-linecap="round"
    />
    <circle
      cx="6"
      cy="12"
      r="1"
      stroke="#4a4e59"
      stroke-width="2"
      stroke-linecap="round"
    />
    <circle
      cx="18"
      cy="12"
      r="1"
      stroke="#4a4e59"
      stroke-width="2"
      stroke-linecap="round"
    />
  </svg>
);

export default SvgThreeDotsHorizontal;
