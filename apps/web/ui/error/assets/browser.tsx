import { Error } from "./error";
import { Warning } from "./warning";
import { Working } from "./working";
import { Text } from "./text";

type Props = {
  type?: "working" | "warning" | "error";
  subtitle?: string;
  //title: string;
};
export function Browser({ type = "working" }: Props) {
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
          <rect x="28" y="7" width="92" height="6" rx="3" fill="#ECEFF3" />
          <rect x="8" y="17" width="112" height="50" rx="4" fill="#ECEFF3" />
          <rect x="8" y="7" width="6" height="6" rx="3" fill="#ECEFF3" />
          <rect x="18" y="7" width="6" height="6" rx="3" fill="#ECEFF3" />
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
      <Text type={type} subtitle="You" title="Browser" />
    </div>
  );
}
