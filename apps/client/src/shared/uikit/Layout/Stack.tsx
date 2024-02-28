import React, { PropsWithChildren } from 'react';
import StackMui, { StackProps } from '@mui/material/Stack';

export const Stack: React.FC<PropsWithChildren<StackProps>> = (props) => {
  return <StackMui {...props}>{props.children}</StackMui>;
};
