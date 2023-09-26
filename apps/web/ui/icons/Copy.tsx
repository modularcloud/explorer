import * as React from "react";
import type { SVGProps } from "react";
const SvgCopy = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={10}
    height={12}
    fill="none"
    {...props}
  >
    <path
      fill="currentColor"
      d="M2.222 2.667V1c0-.307.249-.556.556-.556h6.666c.307 0 .556.25.556.556v7.778a.556.556 0 0 1-.556.555H7.778V11c0 .307-.25.556-.56.556H.56A.556.556 0 0 1 0 11l.001-7.776c0-.307.25-.556.56-.556h1.661Zm-1.11 1.11v6.667h5.555V3.778H1.112Zm2.221-1.11h4.445v5.555h1.11V1.555H3.334v1.112Z"
    />
  </svg>
);
export default SvgCopy;
