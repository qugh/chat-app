import React, { PropsWithChildren } from 'react';
import ListItemTextMui, { ListItemTextProps } from '@mui/material/ListItemText';

export const ListItemText: React.FC<PropsWithChildren<ListItemTextProps>> = (
  props,
) => {
  return <ListItemTextMui {...props}>{props.children}</ListItemTextMui>;
};
