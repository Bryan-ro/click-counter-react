import { useState, useEffect } from "react";
import server from "../api/server";

export default function useLogin() {
    const [login, setLogin] = useState(false);

    useEffect(() => {
        const isLoggedIn = () => {
            server.post("/users/already-logged-in", {}, {
                withCredentials: true
            }).then((response) => {
                if (response.status === 200) {
                    setLogin(true);
                } else {
                    setLogin(false);
                }
            });
        };

        isLoggedIn();

        const setIntervalId = setInterval(isLoggedIn, 60000);

        return () => clearInterval(setIntervalId);
    }, []);

    return login;
}