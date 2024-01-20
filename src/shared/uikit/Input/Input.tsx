import React, { PropsWithChildren } from "react";
import TextFieldMui, { TextFieldProps } from "@mui/material/TextField";

export const Input: React.FC<PropsWithChildren<TextFieldProps>> = (props) => {
  return <TextFieldMui {...props} />;
};