import * as React from "react";
import type { SVGProps } from "react";
const SvgSearchOff = (props: SVGProps<SVGSVGElement>) => (
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
      d="M12.182 12.182 15.5 15.5m-2-6.5a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0"
    />
  </svg>
);
export default SvgSearchOff;
