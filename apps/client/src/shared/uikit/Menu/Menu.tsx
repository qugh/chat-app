import React, { PropsWithChildren } from 'react';
import MenuMui, { MenuProps } from '@mui/material/Menu';

export const Menu: React.FC<PropsWithChildren<MenuProps>> = (props) => {
  return <MenuMui {...props}>{props.children}</MenuMui>;
};
