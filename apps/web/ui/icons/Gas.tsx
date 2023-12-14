import * as React from "react";
import type { SVGProps } from "react";
const SvgGas = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={15}
    fill="none"
    {...props}
  >
    <path
      fill="currentColor"
      d="M9.555 12.694a.778.778 0 0 1 0 1.556H.999a.778.778 0 1 1 0-1.556V1.028c0-.43.349-.778.778-.778h7c.43 0 .778.348.778.778V7.25h1.556c.859 0 1.555.696 1.555 1.556v3.11a.778.778 0 0 0 1.556 0V6.473h-1.556a.778.778 0 0 1-.778-.778V2.906l-.738-.74a.778.778 0 1 1 1.1-1.1l3.3 3.3c.151.153.227.352.227.55v7a2.333 2.333 0 1 1-4.666 0v-3.11H9.555zm-7 0h5.444V8.028H2.555zm0-10.888v4.666h5.444V1.806z"
    />
  </svg>
);
export default SvgGas;
