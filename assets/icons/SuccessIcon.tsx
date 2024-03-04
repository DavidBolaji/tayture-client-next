import React, { HTMLAttributes } from "react";

interface IIcon extends HTMLAttributes<SVGElement> {
  width?: string;
  height?: string;
  color?: string;
}

const SuccessIcon: React.FC<IIcon> = ({ ...rest }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="190"
    height="188"
    viewBox="0 0 190 188"
    fill="none"
    // million-ignore
    {...rest}
  >
    <path
      d="M46.9131 67.5373C51.0384 63.412 71.0733 76.7574 91.6621 97.3463C112.251 117.935 125.596 137.97 121.471 142.095"
      stroke="#FF7517"
      strokeWidth="6.888"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M70.517 102.946C84.7316 74.5441 66.4399 3.93925 14.7277 18.1945C14.4843 18.2617 14.2415 18.3271 13.9993 18.392"
      stroke="#993E00"
      strokeWidth="6.888"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M85.3496 121.639C86.3167 120.892 87.293 120.157 88.2782 119.434C106.165 106.328 151.593 106.848 156.97 142.984"
      stroke="#993E00"
      strokeWidth="6.888"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M112.546 9.92273C112.202 17.7601 98.7317 18.4438 99.0313 26.6319C99.3378 35.0169 113.467 34.5003 113.773 42.8853C114.08 51.2702 99.9503 51.7863 100.257 60.1713C100.267 60.4514 100.293 60.7206 100.333 60.9806"
      stroke="#993E00"
      strokeWidth="6.888"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M159.517 56.0506C153.825 61.4491 143.66 52.5838 138.188 58.682C132.583 64.9266 143.106 74.3698 137.502 80.6144C131.897 86.859 121.375 77.4149 115.771 83.6595C115.584 83.8682 115.415 84.0798 115.263 84.2947"
      stroke="#993E00"
      strokeWidth="6.888"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M121.471 142.095C117.345 146.221 97.311 132.875 76.7222 112.286C56.1334 91.697 42.7873 71.6626 46.9126 67.5373L46.1727 69.5061L4.86771 178.959C3.64624 182.196 6.81185 185.362 10.0486 184.14L119.502 142.835L121.471 142.095Z"
      stroke="#FF7517"
      strokeWidth="6.888"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M73.9607 10.8875L78.1383 3.86287"
      stroke="#FF7517"
      strokeWidth="6.888"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M155.929 173.603L147.149 178.931"
      stroke="#FFA466"
      strokeWidth="6.888"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M181.675 138.76L185.853 131.735"
      stroke="#993E00"
      strokeWidth="6.888"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M4.33228 103.381L10.1113 97.6024"
      stroke="#993E00"
      strokeWidth="6.888"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M165.76 18.6457L159.98 12.8667"
      stroke="#FF7517"
      strokeWidth="6.888"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M94.4748 178.95L91.5256 171.329"
      stroke="#993E00"
      strokeWidth="6.888"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M20.2957 48.3174L26.4903 53.6476"
      stroke="#FFA466"
      strokeWidth="6.888"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M172.436 92.522L170.222 84.6559"
      stroke="#FFA466"
      strokeWidth="6.888"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default SuccessIcon;
