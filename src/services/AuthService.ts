import { AxiosPost } from "./AxiosService";

export const AuthService = {
  login: (data: any) => {
    return AxiosPost("Authorization/login", data);
  },
  register: (data: any) => {
    return AxiosPost("Accounts/users", data);
  },
  forgotPassword: (data: any) => {
    return AxiosPost("/Authorization/reset/password", data);
  },
  confirmEmail: (id: String) => {
    return AxiosPost("Authorization/validate", {
      resetToken: id,
    });
  },
};
