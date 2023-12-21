import axios, { AxiosInstance } from "axios";

const server: AxiosInstance = axios.create({
    baseURL: "https://click-counter.fly.dev",
    withCredentials: true,
    validateStatus: (status) => {
        return status < 500;
    },
    timeout: 10000,
    timeoutErrorMessage: "Failed to connect to the server, please try again later",
    // headers: {
    //     authorization: localStorage.getItem("token")
    // }
});

export default server;