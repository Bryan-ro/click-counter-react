import { useState, useEffect } from "react";
import server from "../api/server";

export default function useLogin() {
    const [login, setLogin] = useState(false);
    const [name, setName] = useState("");

    useEffect(() => {
        const isLoggedIn = () => {
            server.post("/users/already-logged-in", {}, {
                headers: {
                    token: localStorage.getItem("token")
                }
            }).then((response) => {
                if (response.status === 200) {
                    setLogin(true);
                    setName(response.data.user);
                } else {
                    setLogin(false);
                }
            });
        };

        isLoggedIn();

        const setIntervalId = setInterval(isLoggedIn, 60000);

        return () => clearInterval(setIntervalId);
    }, []);

    return { login, name };
}