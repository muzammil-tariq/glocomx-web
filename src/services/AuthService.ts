import { AxiosPost } from "./AxiosService";

export const AuthService = {
  login: (data: any) => {
    return AxiosPost("Authorization/login", data);
  },
  register: (data: any) => {
    return AxiosPost("Accounts/users", data);
  },
  forgotPassword: (data: any) => {
    return AxiosPost("Authorization/reset/password", data);
  },
  ImageUpload: (data: any) => {
    return AxiosPost("Accounts/upload/image", data);
  },
  recoveryEmail: (payload: any) => {
    return AxiosPost(
      `Authorization/send/recovery/email?email=${payload.email}`
    );
  },
  confirmEmail: (id: any) => {
    return AxiosPost("Authorization/validate", {
      resetToken: id,
    });
  },
};
