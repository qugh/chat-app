import { CreateUserDto } from '@server/users/dto/create-user.dto';
import { authApi } from '@client/shared/api/Auth';

export const signUpProvider = async (payload: CreateUserDto) => {
  const { data } = await authApi.signUp(payload);
  return data;
};

export const signInProvider = async (payload: CreateUserDto) => {
  const { data } = await authApi.signIn(payload);
  return data.accessToken;
};
