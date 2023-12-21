import { Error } from "./error";
import { Warning } from "./warning";
import { Working } from "./working";
import { Text } from "./text";

type Props = {
  type?: "working" | "warning" | "error";
};
export function Cloud({ type = "working" }: Props) {
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
            d="M89.5731 59H39.1345C35.1872 59 27.0004 54.3035 27 46.5248C26.9995 36.5439 34.5536 33.3647 38.2573 33.0222C38.5497 26.5644 42.0585 16.4374 53.9006 15.1165C63.3743 14.0598 69.2515 20.4491 71.0059 23.7759C70.9571 23.1399 74.9532 21.134 79.6316 21.8679C86.6386 22.9672 90.1579 29.3041 91.0351 33.0222C99.5146 34.3431 102 41.975 102 46.5248C102 53.9583 96.1521 59 89.5731 59Z"
            fill="#ECEFF3"
          />
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
            color-interpolation-filters="sRGB"
          >
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
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
            color-interpolation-filters="sRGB"
          >
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
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
      <Text type={type} subtitle="Modular Cloud" title="Explorer" />
    </div>
  );
}
