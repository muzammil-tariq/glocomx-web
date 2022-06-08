import { AxiosPost } from "./AxiosService";

export const AuthService = {
  login: (data: any) => {
    return AxiosPost("User/Login", data);
  },
  register: (data: any) => {
    return AxiosPost("Accounts/users", data);
  },
};
