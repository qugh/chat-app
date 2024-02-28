import React, { PropsWithChildren } from 'react';
import ListItemMui, { ListItemProps } from '@mui/material/ListItem';

export const ListItem: React.FC<PropsWithChildren<ListItemProps>> = (props) => {
  return <ListItemMui {...props}>{props.children}</ListItemMui>;
};
