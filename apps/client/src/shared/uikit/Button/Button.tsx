import React, { PropsWithChildren } from 'react';
import MuiButton, { ButtonProps } from '@mui/material/Button';

export const Button: React.FC<PropsWithChildren<ButtonProps>> = (props) => {
  return (
    <MuiButton variant="contained" {...props}>
      {props.children}
    </MuiButton>
  );
};
