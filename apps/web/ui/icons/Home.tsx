import * as React from "react";
import type { SVGProps } from "react";
const SvgHome = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={12}
    height={13}
    fill="none"
    {...props}
  >
    <path
      fill="currentColor"
      d="M6.667 11.667h4V5.652L6 2.022l-4.667 3.63v6.015h4V8.333a.667.667 0 0 1 1.334 0v3.334Zm5.333.666a.667.667 0 0 1-.667.667H.667A.667.667 0 0 1 0 12.333V5.326c0-.206.095-.4.257-.526L5.591.652a.667.667 0 0 1 .818 0L11.743 4.8c.162.126.257.32.257.526v7.007Z"
    />
  </svg>
);
export default SvgHome;
