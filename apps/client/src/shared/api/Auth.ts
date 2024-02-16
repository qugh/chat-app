import { CreateUserDto } from '@server/users/dto/create-user.dto';
import { AxiosResponse } from 'axios';
import { User } from '@server/users/users.model';
import { BaseApi } from '@client/shared/api/Base';

class AuthApi extends BaseApi {
  constructor() {
    super();
  }

  public signUp = async (
    payload: CreateUserDto,
  ): Promise<AxiosResponse<User>> => {
    return await this.POST('/auth/register', payload);
  };

  public signIn = async (
    payload: CreateUserDto,
  ): Promise<AxiosResponse<{ accessToken: string }>> => {
    return await this.POST('/auth/login', payload);
  };
}

export const authApi = new AuthApi();
