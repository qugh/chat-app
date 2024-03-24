import React, { PropsWithChildren } from 'react';
import ListMui, { ListProps } from '@mui/material/List';

export const List: React.FC<PropsWithChildren<ListProps>> = React.forwardRef(
  (props, ref) => {
    return (
      <ListMui {...props} ref={ref}>
        {props.children}
      </ListMui>
    );
  },
);
