import React, { PropsWithChildren } from 'react';
import AvatarMui, { AvatarProps } from '@mui/material/Avatar';

export const Avatar: React.FC<PropsWithChildren<AvatarProps>> = (props) => {
  return <AvatarMui {...props}>{props.children}</AvatarMui>;
};
