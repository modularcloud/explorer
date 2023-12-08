import * as React from "react";
import type { SVGProps } from "react";
const SvgRecycle = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <g fill="currentColor">
      <path d="M15.195 18.472c.26.26.683.26.943 0l1.529-1.53c.52-.52.52-1.364 0-1.885l-1.529-1.528a.667.667 0 1 0-.943.943l.862.861h-7.39A1.333 1.333 0 0 1 7.334 14v-1.333a.667.667 0 0 0-1.334 0V14a2.667 2.667 0 0 0 2.667 2.667h7.39l-.862.862a.667.667 0 0 0 0 .942M18 11.333a.667.667 0 0 1-1.333 0V10c0-.736-.597-1.333-1.334-1.333h-7.39l.862.862a.667.667 0 0 1-.943.943l-1.529-1.53a1.333 1.333 0 0 1 0-1.885L7.862 5.53a.667.667 0 1 1 .943.942l-.862.862h7.39A2.667 2.667 0 0 1 18 10z" />
    </g>
  </svg>
);
export default SvgRecycle;
