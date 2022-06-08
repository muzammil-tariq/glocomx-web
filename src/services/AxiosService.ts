import axios from "axios";
import { ApiEndpoint } from "../common/constants";

axios.interceptors.request.use(
    async (config: any) => {
        let customer = JSON.parse(localStorage.getItem("customer") as string);
        if (customer?.token) {
            config.headers.authorization = "Bearer " + customer.token ?? "";
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const AxiosGet = async (url: string, queryParams?: any) => axios.get(ApiEndpoint + url, { params: queryParams });
export const AxiosPost = async (url: string, body?: any) => axios.post(ApiEndpoint + url, body);
export const AxiosPut = async (url: string, queryParams?: any, body?: any) => axios.put(ApiEndpoint + url, body);
export const AxiosPatch = async (url: string, queryParams?: any, body?: any) => axios.patch(ApiEndpoint + url, body);
export const AxiosRemove = async (url: string) => axios.delete(ApiEndpoint + url);
