import { AxiosResponse } from 'axios';
import { User } from '@server/users/users.model';
import { BaseApi } from '@client/shared/api/Base';

class UsersApi extends BaseApi {
  private baseUrl = '/users/';

  constructor() {
    super();
  }

  public getMyProfile = async (): Promise<
    AxiosResponse<InstanceType<typeof User>>
  > => {
    const data = await this.GET(this.baseUrl + 'me');
    return data;
  };
}

export const usersApi = new UsersApi();
