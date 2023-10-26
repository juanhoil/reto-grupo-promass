import { httpClient } from "./httpClient";

const path = "auth";

export const loginService = async (data: {
  email: string;
  password: string;
}) => {
  return await httpClient.post(`${path}/login`, data).then((res) => res.data);
};

export const forgotPassword = async (data: { email: string }) => {
  return await httpClient
    .post(`${path}/forgot-password`, data)
    .then((res) => res.data);
};

export const changePassword = async (
  userId: string,
  oldPassword: string,
  newPassword: string,
  repeatNewPassword: string
) => {
  return await httpClient
    .put(`${path}/change-password/${userId}`, {
      oldPassword,
      newPassword,
      repeatNewPassword,
    })
    .then((res) => res.data);
};

export const restorePassword = async (id: string) => {
  return await httpClient
    .put(`${path}/restore-password/${id}`)
    .then((res) => res.data);
};
