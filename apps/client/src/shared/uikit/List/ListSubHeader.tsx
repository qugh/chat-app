import React, { PropsWithChildren } from 'react';
import ListSubheaderMui, {
  ListSubheaderProps,
} from '@mui/material/ListSubheader';

export const ListSubHeader: React.FC<PropsWithChildren<ListSubheaderProps>> = (
  props,
) => {
  return <ListSubheaderMui {...props}>{props.children}</ListSubheaderMui>;
};
