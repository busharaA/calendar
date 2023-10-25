import axios, { AxiosInstance } from "axios"
import { AXIOS_CONFIG } from "../../../helpers/constants/axiosConfig"

const getAxiosInstance = (): AxiosInstance => {
    return axios.create(AXIOS_CONFIG);
};

export const getResource = (url: string) => {
    return getAxiosInstance().get(url);
};