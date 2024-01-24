import React, { PropsWithChildren } from "react";
import BoxMui, { BoxProps } from "@mui/material/Box";

export const Box: React.FC<PropsWithChildren<BoxProps>> = (props) => {
  return <BoxMui {...props} >{props.children}</BoxMui>;
};