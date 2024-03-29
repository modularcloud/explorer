import * as React from "react";
import type { SVGProps } from "react";
const SvgList = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    fill="none"
    {...props}
  >
    <path
      fill="currentColor"
      d="M4.444 1.778c0-.49.398-.889.89-.889h9.777a.889.889 0 0 1 0 1.778H5.333a.889.889 0 0 1-.889-.889m-3.11 1.333a1.333 1.333 0 1 1 0-2.666 1.333 1.333 0 0 1 0 2.666m0 6.223a1.333 1.333 0 1 1 0-2.667 1.333 1.333 0 0 1 0 2.667m0 6.133a1.333 1.333 0 1 1 0-2.667 1.333 1.333 0 0 1 0 2.667M4.443 8c0-.49.398-.889.89-.889h9.777a.889.889 0 0 1 0 1.778H5.333A.889.889 0 0 1 4.444 8m0 6.223c0-.491.398-.89.89-.89h9.777a.889.889 0 0 1 0 1.778H5.333a.889.889 0 0 1-.889-.888"
    />
  </svg>
);
export default SvgList;
