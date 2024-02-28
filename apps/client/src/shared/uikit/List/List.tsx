import React, { PropsWithChildren } from 'react';
import ListMui, { ListProps } from '@mui/material/List';

export const List: React.FC<PropsWithChildren<ListProps>> = (props) => {
  return <ListMui {...props}>{props.children}</ListMui>;
};
