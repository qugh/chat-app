import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router';
import { useProfile, useUpdateEffect } from '@client/shared/hooks';

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

  return <Outlet />;
};
