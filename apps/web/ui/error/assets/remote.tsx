import { Error } from "./error";
import { Warning } from "./warning";
import { Working } from "./working";
import { Text } from "./text";

type Props = {
  type?: "working" | "warning" | "error";
  networkName: string;
};
export function Remote({ type = "working", networkName }: Props) {
  return (
    <div>
      <svg
        width="128"
        height="96"
        viewBox="0 0 128 96"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g filter="url(#filter0_dd_2509_23722)">
          <rect x="2" y="1" width="124" height="72" rx="6" fill="white" />
          <path
            d="M34 40.5224L44.0354 14.5579C44.6313 13.0164 46.1138 12 47.7664 12H79.8913C81.4798 12 82.9178 12.94 83.5552 14.3951L95 40.5224V55.1583C95 56.0973 94.6696 57.0065 94.0667 57.7264L92.5244 59.5681C91.7644 60.4757 90.6414 61 89.4577 61H39.5423C38.3586 61 37.2356 60.4757 36.4756 59.5681L34.9333 57.7264C34.3304 57.0065 34 56.0973 34 55.1583V40.5224Z"
            fill="#ECEFF3"
          />
          <rect x="38" y="42" width="53" height="15" rx="4" fill="white" />
          <circle cx="83.5" cy="49.5" r="2.5" fill="#ECEFF3" />
          <circle cx="74.5" cy="49.5" r="2.5" fill="#ECEFF3" />
        </g>
        <g filter="url(#filter1_dd_2509_23722)">
          <rect x="44" y="53" width="40" height="40" rx="4" fill="white" />
          {type === "working" ? <Working /> : null}
          {type === "warning" ? <Warning /> : null}
          {type === "error" ? <Error /> : null}
        </g>
        <defs>
          <filter
            id="filter0_dd_2509_23722"
            x="0"
            y="0"
            width="128"
            height="76"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="1" />
            <feGaussianBlur stdDeviation="1" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0.0219618 0 0 0 0 0.0958332 0 0 0 0 0.169705 0 0 0 0.08 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow_2509_23722"
            />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feMorphology
              radius="1"
              operator="dilate"
              in="SourceAlpha"
              result="effect2_dropShadow_2509_23722"
            />
            <feOffset />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0.0696 0 0 0 0 0.215657 0 0 0 0 0.4104 0 0 0 0.1 0"
            />
            <feBlend
              mode="normal"
              in2="effect1_dropShadow_2509_23722"
              result="effect2_dropShadow_2509_23722"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect2_dropShadow_2509_23722"
              result="shape"
            />
          </filter>
          <filter
            id="filter1_dd_2509_23722"
            x="42"
            y="52"
            width="44"
            height="44"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="1" />
            <feGaussianBlur stdDeviation="1" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0.0219618 0 0 0 0 0.0958332 0 0 0 0 0.169705 0 0 0 0.08 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow_2509_23722"
            />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feMorphology
              radius="1"
              operator="dilate"
              in="SourceAlpha"
              result="effect2_dropShadow_2509_23722"
            />
            <feOffset />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0.0696 0 0 0 0 0.215657 0 0 0 0 0.4104 0 0 0 0.1 0"
            />
            <feBlend
              mode="normal"
              in2="effect1_dropShadow_2509_23722"
              result="effect2_dropShadow_2509_23722"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect2_dropShadow_2509_23722"
              result="shape"
            />
          </filter>
        </defs>
      </svg>
      <Text type={type} subtitle={networkName} title="Node" />
    </div>
  );
}
