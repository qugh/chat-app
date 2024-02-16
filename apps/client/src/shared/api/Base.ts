import axios from 'axios';
import { getAccessToken } from '@client/shared/utils/localstorage';

export class BaseApi {
  private BACKEND_URL = 'http://localhost:5000/api/';

  private instance = axios.create({
    baseURL: this.BACKEND_URL,
    headers: {
      Authorization: `Bearer ${getAccessToken()}`,
    },
  });

  public GET = this.instance.get;
  public POST = this.instance.post;
  public DELETE = this.instance.delete;
}
