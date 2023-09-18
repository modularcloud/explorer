import * as React from "react";
import type { SVGProps } from "react";
const SvgDocument = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={15}
    height={17}
    fill="none"
    {...props}
  >
    <path
      fill="currentColor"
      d="M14.244 4.882a.875.875 0 0 1 .256.619v9.743a.777.777 0 0 1-.773.783H1.273a.772.772 0 0 1-.773-.771V1.243c0-.417.349-.771.78-.771h8.189c.232 0 .454.092.618.256l4.157 4.154Zm-1.3 1.034H9.931a.875.875 0 0 1-.875-.875V2.027h-7v12.445h10.888V5.916ZM4.39 5.138c0-.43.348-.777.778-.777h.777a.778.778 0 1 1 0 1.555h-.777a.778.778 0 0 1-.778-.778Zm0 3.111c0-.43.348-.777.778-.777h4.666a.778.778 0 1 1 0 1.555H5.167a.778.778 0 0 1-.778-.778Zm0 3.112c0-.43.348-.778.778-.778h4.666a.778.778 0 1 1 0 1.555H5.167a.778.778 0 0 1-.778-.777Z"
    />
  </svg>
);
export default SvgDocument;
