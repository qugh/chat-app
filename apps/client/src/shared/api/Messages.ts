import { BaseApi } from '@client/shared/api/Base';
import { AxiosResponse } from 'axios';

class MessagesApiInstance extends BaseApi {
  constructor() {
    super();
  }

  public getAllMessages = async (): Promise<AxiosResponse<any>> => {
    return await this.GET('/messages');
  };
}

export const MessagesApi = new MessagesApiInstance();
