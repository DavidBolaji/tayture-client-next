import React from "react";
import { IIcon } from "./types/types";

interface ICaret extends IIcon {
  disabled: boolean;
}

const PrevCaret: React.FC<ICaret> = ({ width, disabled }) => (
  <svg
    width={width || "48"}
    height="48"
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="cursor-pointer transition-transform duration-500 ease-in hover:scale-[1.04]"
  >
    <mask
      id="mask0_696_2310"
      // style="mask-type:alpha"
      maskUnits="userSpaceOnUse"
      x="0"
      y="0"
      width="48"
      height="48"
    >
      <rect
        x="48"
        width="48"
        height="48"
        transform="rotate(90 48 0)"
        fill="#D9D9D9"
      />
    </mask>
    <g mask="url(#mask0_696_2310)">
      <path
        d="M17 24L26 33L28.8 30.15L22.65 24L28.8 17.85L26 15L17 24ZM4 24C4 21.2333 4.525 18.6333 5.575 16.2C6.625 13.7667 8.05 11.65 9.85 9.85C11.65 8.05 13.7667 6.625 16.2 5.575C18.6333 4.525 21.2333 4 24 4C26.7667 4 29.3667 4.525 31.8 5.575C34.2333 6.625 36.35 8.05 38.15 9.85C39.95 11.65 41.375 13.7667 42.425 16.2C43.475 18.6333 44 21.2333 44 24C44 26.7667 43.475 29.3667 42.425 31.8C41.375 34.2333 39.95 36.35 38.15 38.15C36.35 39.95 34.2333 41.375 31.8 42.425C29.3667 43.475 26.7667 44 24 44C21.2333 44 18.6333 43.475 16.2 42.425C13.7667 41.375 11.65 39.95 9.85 38.15C8.05 36.35 6.625 34.2333 5.575 31.8C4.525 29.3667 4 26.7667 4 24Z"
        fill={disabled ? "#FFA466" : "#FF7517"}
      />
    </g>
  </svg>
);

export default PrevCaret;
