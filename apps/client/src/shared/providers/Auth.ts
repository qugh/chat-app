import { CreateUserDto } from '@server/users/dto/create-user.dto';
import { authApi } from '@client/shared/api/Auth';
import { setAccessToken } from '@client/shared/utils/localstorage';
import { AxiosError } from 'axios';

export const signUpProvider = async (payload: CreateUserDto) => {
  try {
    const { data } = await authApi.signUp(payload);
    return data;
  } catch (e) {
    if (e instanceof AxiosError) {
      throw e.response?.data;
    }
  }
};

export const signInProvider = async (payload: CreateUserDto) => {
  try {
    const { data } = await authApi.signIn(payload);
    setAccessToken(data.accessToken);

    return data.accessToken;
  } catch (e) {
    if (e instanceof AxiosError) {
      console.log('error', e.response);
      throw new Error(e.message);
    }
  }
};
