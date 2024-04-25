import React, { useState } from 'react';
import {
  Avatar,
  Box,
  Divider,
  Menu,
  MenuItem,
  Tooltip,
  Icons,
} from '@client/shared/uikit';
import { User } from '@server/users/users.model';
import { useNavigate } from 'react-router';
import { IconButton, ListItemIcon } from '@mui/material';
import { useToggle } from '@client/shared/hooks';

export const Header: React.FC<{ user?: User }> = ({ user }) => {
  const navigate = useNavigate();
  const toggle = useToggle();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const isMenuOpened = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box
      display="flex"
      flexGrow={1}
      alignItems="center"
      padding="12px"
      alignSelf="end"
      justifyContent="right"
    >
      <Tooltip title="Profile settings">
        <IconButton
          aria-controls={isMenuOpened ? 'account-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={isMenuOpened ? 'true' : undefined}
          onClick={handleClick}
        >
          <Avatar sx={{ width: 32, height: 32 }}>{user?.email[0]}</Avatar>
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        onClose={handleClose}
        onClick={handleClose}
        open={isMenuOpened}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&::before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={() => navigate('/profile')}>
          <Avatar /> Profile
        </MenuItem>
        <Divider />
        <MenuItem>
          <ListItemIcon>
            <Icons.Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </Box>
  );
};
