/* eslint-disable  react/jsx-props-no-spreading */
/* eslint-disable  react/require-default-props */
/* eslint-disable  react/function-component-definition */
/* eslint-disable  react/jsx-props-no-spreading */
import React from "react";
import { IIcon } from "./types/types";

const ArrowLongIcon: React.FC<IIcon> = ({ ...rest }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="19"
    height="9"
    viewBox="0 0 19 9"
    fill="none"
    // million-ignore
    {...rest}
  >
    <path
      d="M14.5 9L13.075 7.6L15.175 5.5H0V3.5H15.175L13.1 1.4L14.525 0L19 4.5L14.5 9Z"
      fill="#FF7517"
    />
  </svg>
);

export default ArrowLongIcon;
