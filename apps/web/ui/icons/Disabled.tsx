import * as React from "react";
import type { SVGProps } from "react";
const SvgDisabled = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={18}
    height={18}
    fill="none"
    {...props}
  >
    <path
      fill="currentColor"
      d="M9.003 17.89a8.889 8.889 0 1 1 0-17.778 8.889 8.889 0 0 1 0 17.778Zm0-1.778a7.111 7.111 0 1 0 0-14.222 7.111 7.111 0 0 0 0 14.222ZM12.774 5.23c.365.364.31.948-.055 1.312l-6.175 6.175c-.364.365-.948.42-1.312.055-.365-.364-.31-.947.055-1.312l6.175-6.175c.365-.364.948-.42 1.312-.055Z"
    />
  </svg>
);
export default SvgDisabled;
