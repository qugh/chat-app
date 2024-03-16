import axios, { AxiosInstance } from 'axios';
import { getAccessToken } from '@client/shared/utils/localstorage';

const BACKEND_URL = 'http://localhost:5000/api/';

const instance = axios.create({
  baseURL: BACKEND_URL,
  headers: {
    common: {
      Authorization: `Bearer ${getAccessToken()}`,
    },
  },
});

export class BaseApi {
  private instance: AxiosInstance;

  constructor() {
    this.instance = instance;
  }

  public set accessToken(token: string) {
    this.instance.defaults.headers.common.Authorization = `Bearer ${token}`; // for all requests
  }

  public GET = (url: string) => this.instance.get(url);

  public POST = (url: string, data: Record<string, any>) =>
    this.instance.post(url, data);

  public DELETE = (url: string) => this.instance.delete(url);
}
