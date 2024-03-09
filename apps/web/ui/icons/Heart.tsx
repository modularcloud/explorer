import * as React from "react";
import type { SVGProps } from "react";
const SvgHeart = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      fill="currentColor"
      d="M12.245 21.436c8.911-5.019 10.813-10.804 9.278-14.648-.755-1.893-2.336-3.239-4.187-3.654-1.738-.39-3.673.05-5.336 1.55-1.664-1.5-3.598-1.94-5.336-1.55-1.852.415-3.433 1.76-4.188 3.654-1.534 3.844.367 9.63 9.278 14.648a.5.5 0 0 0 .491 0Z"
    />
  </svg>
);
export default SvgHeart;
