import { getAccessToken } from '@client/shared/utils/localstorage';
import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@client/shared/constants';
import { getProfile } from '@client/shared/providers/Users';

export const useProfile = () => {
  const token = getAccessToken();

  const profileQuery = useQuery({
    queryKey: [queryKeys.GET_PROFILE],
    queryFn: getProfile,
    enabled: Boolean(token),
    refetchOnWindowFocus: false,
  });


  return { profileQuery, token };
};
