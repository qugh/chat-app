import { BaseApi } from '@client/shared/api/Base';
import { AxiosResponse } from 'axios';

class MessagesApiInstance extends BaseApi {
  public getAllMessages = async <T>(): Promise<AxiosResponse<T>> => {
    return await this.GET('/messages');
  };

  public deleteAllMessages = async () => {
    return await this.DELETE('/messages');
  };
}

export const MessagesApi = new MessagesApiInstance();
