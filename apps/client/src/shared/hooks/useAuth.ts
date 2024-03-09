import { getAccessToken } from '@client/shared/utils/localstorage';
import { useNavigate } from 'react-router';
import { useEffect } from 'react';

export const useAuth = () => {
  const token = getAccessToken();
  const navigate = useNavigate();
  useEffect(() => {
    navigate(token ? '/chat' : '/sign-in');
  }, []);
};
