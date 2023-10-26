import axios from "axios";

export const APIBOTANGEL = "http://localhost:3001";
//export const APIBOTANGEL = "https://apibotangel.31rooms.com";

const botAngelUser: any = localStorage.getItem("bot-angel-user");
const token = JSON.parse(botAngelUser)?.state.token;

export const httpClient = axios.create({
  baseURL: APIBOTANGEL,
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
    "X-Requested-With": "XMLHttpRequest",
    Authorization: `Bearer ${token}`,
  },
});

httpClient.interceptors.request.use(
  (config) => {
    if (token) {
      config.headers["Content-Type"] = "application/json";
      config.headers["X-Requested-With"] = "XMLHttpRequest";
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    if (config.data instanceof FormData) {
      // Si el dato es de tipo FormData, establecer el tipo de contenido adecuado.
      config.headers["Content-Type"] = "multipart/form-data";
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
