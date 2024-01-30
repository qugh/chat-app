import React, { PropsWithChildren } from 'react';
import LinkMui, { LinkProps } from '@mui/material/Link';

export const Link: React.FC<PropsWithChildren<LinkProps>> = (props) => {
  return <LinkMui {...props}>{props.children}</LinkMui>;
};
