import { httpClient } from "./httpClient";

const path = "users";

export const usersGet = async () => {
  return await httpClient.get(`${path}`).then((res) => res.data.data);
};

export const usersGetByQuery = async (query: string) => {
  return await httpClient
    .get(`${path}?query=${query}`)
    .then((res) => res.data.data);
};

export const userEdit = async (
  id: string,
  user: {
    name?: string;
    phone?: string;
    role?: string;
  }
) => {
  return await httpClient.put(`${path}/${id}`, user).then((res) => res.data);
};

export const userCreate = async (user: {
  name: string;
  phone: string;
  role: string;
  email: string;
  password?: string;
  type: UserType;
}) => {
  return await httpClient.post(`${path}`, user).then((res) => res.data.data);
};

export const userDelete = async (id: string) => {
  return await httpClient.delete(`${path}/${id}`).then((res) => res.data);
};
