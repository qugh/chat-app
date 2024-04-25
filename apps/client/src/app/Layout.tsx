import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router';
import { useProfile, useUpdateEffect } from '@client/shared/hooks';
import { Header } from '@client/widgets';
import { Stack } from '@client/shared/uikit';

export const Layout: React.FC = () => {
  const { profileQuery, token } = useProfile();

  const navigate = useNavigate();

  useUpdateEffect(() => {
    navigate(profileQuery.isSuccess ? '/' : '/sign-in');
  }, [profileQuery.isSuccess]);

  useEffect(() => {
    if (!token) return navigate('sign-in');
  }, []);

  if (profileQuery.isLoading) return <>Loading...</>;

  return (
    <Stack
      sx={(theme) => ({
        [theme.breakpoints.up('lg')]: {
          maxWidth: '1076px',
          margin: '0 auto',
        },
      })}
    >
      <Header user={profileQuery.data} />
      <Outlet />
    </Stack>
  );
};
