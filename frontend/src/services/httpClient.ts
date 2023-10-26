import axios from "axios";

export const APIBOTANGEL = "http://localhost:3001";
//export const APIBOTANGEL = "https://apibotangel.31rooms.com";

const botAngelUser: any = localStorage.getItem("blog-user");
const token = JSON.parse(botAngelUser)?.state.token;

export const httpClient = axios.create({
  baseURL: APIBOTANGEL,
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
    "X-Requested-With": "XMLHttpRequest",
    Authorization: `Bearer ${token}`,
  },
});

httpClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      originalRequest.headers["Authorization"] = `Bearer ${token}`;
      return axios(originalRequest);
    }

    return Promise.reject(error);
  }
);

httpClient.interceptors.request.use(
  (config) => {
    console.log('err______',token)
    if (token) {
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
