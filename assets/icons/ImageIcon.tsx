import React, { HTMLAttributes } from "react";

interface IIcon extends HTMLAttributes<SVGElement> {
  width?: string;
  height?: string;
  color?: string;
}

const ImageIcon: React.FC<IIcon> = ({ ...rest }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="40"
    height="40"
    viewBox="0 0 40 40"
    fill="none"
    // million-ignore
    {...rest}
  >
    <path
      d="M25 13.3333H25.0167M5 10C5 8.67392 5.52678 7.40215 6.46447 6.46447C7.40215 5.52678 8.67392 5 10 5H30C31.3261 5 32.5979 5.52678 33.5355 6.46447C34.4732 7.40215 35 8.67392 35 10V30C35 31.3261 34.4732 32.5979 33.5355 33.5355C32.5979 34.4732 31.3261 35 30 35H10C8.67392 35 7.40215 34.4732 6.46447 33.5355C5.52678 32.5979 5 31.3261 5 30V10Z"
      stroke="#232323"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M5 26.6669L13.3333 18.3335C14.88 16.8452 16.7867 16.8452 18.3333 18.3335L26.6667 26.6669"
      stroke="#232323"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M23.3335 23.3332L25.0002 21.6665C26.5468 20.1782 28.4535 20.1782 30.0002 21.6665L35.0002 26.6665"
      stroke="#232323"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default ImageIcon;
