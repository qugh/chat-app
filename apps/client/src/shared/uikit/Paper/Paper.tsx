import React, { PropsWithChildren } from 'react';
import PaperMui, { PaperProps } from '@mui/material/Paper';

export const Paper: React.FC<PropsWithChildren<PaperProps>> = (props) => {
  return <PaperMui {...props}>{props.children}</PaperMui>;
};
