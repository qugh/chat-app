import React, { PropsWithChildren } from 'react';
import DividerMui, { DividerProps } from '@mui/material/Divider';

export const Divider: React.FC<PropsWithChildren<DividerProps>> = (props) => {
  return <DividerMui {...props}>{props.children}</DividerMui>;
};
