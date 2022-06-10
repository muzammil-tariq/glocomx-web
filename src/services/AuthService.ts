import { AxiosPost } from "./AxiosService";

export const AuthService = {
  login: (data: any) => {
    return AxiosPost("Authorization/login", data);
  },
  register: (data: any) => {
    return AxiosPost("Accounts/users", data);
  },
  confirmEmail: (id: String) => {
    return AxiosPost("Authorization/validate", {
      resetToken: id,
    });
  },
};
