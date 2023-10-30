import * as React from "react";
import type { SVGProps } from "react";
const SvgFolder = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={15}
    fill="none"
    {...props}
  >
    <path
      fill="currentColor"
      d="M7.95 1.348a1.73 1.73 0 0 0 1.224.507h5.885c.425 0 .769.344.769.769v10.764a.769.769 0 0 1-.769.77H1.22a.769.769 0 0 1-.769-.77V1.087c0-.424.344-.769.77-.769h4.983c.459 0 .899.183 1.223.507l.525.524ZM1.989 3.393v9.227H14.29V3.393H1.988Z"
    />
  </svg>
);
export default SvgFolder;
