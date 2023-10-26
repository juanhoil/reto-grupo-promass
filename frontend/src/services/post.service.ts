import { IPost } from "../types/post.type";
import { httpClient } from "./httpClient";

const path = "post";

export const postCreate = async (post: Partial<Template>) => {
  return await httpClient.post(`${path}`, post).then((res) => res.data.data);
};

export const postUpdate = async (id: number, template: Partial<Template>) => {
  return await httpClient.put(`${path}/${id}`, template).then((res) => res.data.data);
};

export const postGetOne = async (id: number) => {
  return await httpClient.get(`${path}/${id}`).then((res) => res.data.data);
};

export const postGetAll = async () => {
  return await httpClient.get(`${path}`).then((res) => res.data.data);
};

export const postDelete = async (id: number) => {
  return await httpClient.delete(`${path}/${id}`).then((res) => res.data.data);
};
