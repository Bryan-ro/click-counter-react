import axios, { AxiosInstance } from "axios";

const server: AxiosInstance = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true,
    validateStatus: (status) => {
        return status < 500;
    },
    timeout: 10000,
    timeoutErrorMessage: "Failed to connect to the server, please try again later",
});

export default server;