import * as React from "react";
import type { SVGProps } from "react";
const SvgGlobeWeb = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    fill="none"
    {...props}
  >
    <path
      stroke="currentColor"
      strokeLinecap="square"
      strokeWidth={1.5}
      d="M8 14.165A6.167 6.167 0 0 0 8 1.832m0 12.333A6.167 6.167 0 0 1 8 1.832m0 12.333c-1.564 0-2.833-2.76-2.833-6.166 0-3.406 1.269-6.167 2.834-6.167m0 12.333c1.564 0 2.833-2.76 2.833-6.166 0-3.406-1.269-6.167-2.833-6.167m6 6.167H2"
    />
  </svg>
);
export default SvgGlobeWeb;
