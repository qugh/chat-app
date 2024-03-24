import { usersApi } from '@client/shared/api/Users';
import { AxiosError } from 'axios';

export const getProfile = async () => {
  try {
    const { data } = await usersApi.getMyProfile();
    return data;
  } catch (e) {
    if (e instanceof AxiosError) {
      throw e.response?.data;
    }
  }
};
