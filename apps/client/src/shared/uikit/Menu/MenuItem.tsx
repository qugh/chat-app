import React, { PropsWithChildren } from 'react';
import MenuItemMui, { MenuItemProps } from '@mui/material/MenuItem';

export const MenuItem: React.FC<PropsWithChildren<MenuItemProps>> = (props) => {
  return <MenuItemMui {...props}>{props.children}</MenuItemMui>;
};
