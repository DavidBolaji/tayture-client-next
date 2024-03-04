import { HTMLAttributes } from "react";

export interface IIcon extends HTMLAttributes<SVGElement> {
  width?: string;
  height?: string;
  color?: string;
}
