import { httpClient } from "./httpClient";

const path = "template";

export const templatesGet = async () => {
  return await httpClient.get(`${path}/get`).then((res) => res.data.data);
};

export const templatePost = async (template: Partial<Template>) => {
  return await httpClient
    .post(`${path}`, template)
    .then((res) => res.data.data);
};

export const templateEdit = async (id: string, template: Partial<Template>) => {
  return await httpClient
    .put(`${path}/${id}`, template)
    .then((res) => res.data);
};

export const templateDelete = async (id: string) => {
  return await httpClient.delete(`${path}/${id}`).then((res) => res.data.data);
};
