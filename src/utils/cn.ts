import { ClassNamesArg, cx } from "@emotion/css";
import { twMerge } from "tailwind-merge";

export const cn = (...classNames: ClassNamesArg[]) => {
  return twMerge(cx(classNames));
};
