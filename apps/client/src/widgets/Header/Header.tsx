import React from 'react';
import { Avatar, Box, Chip } from '@client/shared/uikit';
import { User } from '@server/users/users.model';

export const Header: React.FC<{ user?: User }> = ({ user }) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      gap={1}
      justifyContent="right"
      p={2}
    >
      <Chip label={user?.email} />
      <Avatar />
    </Box>
  );
};
