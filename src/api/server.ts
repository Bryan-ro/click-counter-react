import axios from "axios";

export default axios.create({
    baseURL: "http://localhost:4444",
    timeout: 10000,
    timeoutErrorMessage: "Failed to connect to the server, please try again later"
});


