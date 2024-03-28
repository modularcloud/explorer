import * as React from "react";
import type { SVGProps } from "react";
const SvgUndo = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      fill="currentColor"
      d="M7.03 5.53a.75.75 0 0 0-1.06-1.06L2.677 7.763a1.75 1.75 0 0 0 0 2.474L5.97 13.53a.75.75 0 0 0 1.06-1.06L4.31 9.75h12.94A3.25 3.25 0 0 1 20.5 13v1.25a3.25 3.25 0 0 1-3.25 3.25h-5.5a.75.75 0 0 0 0 1.5h5.5A4.75 4.75 0 0 0 22 14.25V13a4.75 4.75 0 0 0-4.75-4.75H4.31l2.72-2.72Z"
    />
  </svg>
);
export default SvgUndo;
