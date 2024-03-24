import { useProfile } from '@client/shared/hooks/useProfile';
import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router';
import { useUpdateEffect } from '@client/shared/hooks/useUpdateEffect';

export const App: React.FC = () => {
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
