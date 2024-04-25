import React, { PropsWithChildren } from 'react';
import TooltipMui, { TooltipProps } from '@mui/material/Tooltip';

export const Tooltip: React.FC<PropsWithChildren<TooltipProps>> = (props) => {
  return <TooltipMui {...props}>{props.children}</TooltipMui>;
};
