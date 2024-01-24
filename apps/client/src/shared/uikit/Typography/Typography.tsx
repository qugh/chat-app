import React, { PropsWithChildren } from "react";
import TypographyMui, { TypographyProps } from "@mui/material/Typography";

export const Typography: React.FC<PropsWithChildren<TypographyProps>> = (props) => {
  return <TypographyMui {...props}>{props.children}</TypographyMui>;
};
