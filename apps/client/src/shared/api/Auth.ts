import { CreateUserDto } from "@server/users/dto/create-user.dto";
import axios, { AxiosResponse } from "axios";
import { User } from "@server/users/users.model";

class AuthApi {
  private BACKEND_URL = "http://localhost:5000/api/auth";

  public signUp = async (
    payload: CreateUserDto,
  ): Promise<AxiosResponse<User>> => {
    return await axios.post(this.BACKEND_URL + "/register", payload);
  };

  public signIn = async (
    payload: CreateUserDto,
  ): Promise<AxiosResponse<{ accessToken: string }>> => {
    return await axios.post(this.BACKEND_URL + "/login", payload);
  };
}

export const authApi = new AuthApi();
