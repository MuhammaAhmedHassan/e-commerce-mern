import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { AppLocalStorage } from "./AppLocalStorage";

const baseURL = process.env.REACT_APP_API!;

const HTTP = axios.create({
  baseURL,
  proxy: { protocol: "http", host: "localhost", port: 8000 },
});

const errHandling = (error: any) => Promise.reject(error);

const reqHandling = (config: AxiosRequestConfig) => {
  const idToken = AppLocalStorage.getItem("USER_AUTH_TOKEN");

  const obj = { ...config };
  if (idToken) obj.headers["authorization"] = idToken;
  obj.headers["Access-Control-Allow-Origin"] = "*";
  return obj;
};

const resHandling = (response: AxiosResponse<any>) => response;

HTTP.interceptors.request.use(reqHandling, errHandling);
HTTP.interceptors.response.use(resHandling, errHandling);

export { HTTP };
