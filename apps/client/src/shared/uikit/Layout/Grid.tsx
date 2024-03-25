import React, { PropsWithChildren } from 'react';
import GridMui, { GridProps } from '@mui/material/Grid';

export const Grid: React.FC<PropsWithChildren<GridProps>> = (props) => {
  return <GridMui {...props}>{props.children}</GridMui>;
};
