import { useState, useEffect } from "react";
import server from "../api/server";

export default function useLogin() {
    const [login, setLogin] = useState(false);
    const [name, setName] = useState("");
    const [logLoading, setLogLoading] = useState(true);

    useEffect(() => {
        const isLoggedIn = () => {
            server.post("/users/already-logged-in", {}, {}).then((response) => {
                if (response.status === 200) {
                    setLogin(true);
                    setName(response.data.user);
                } else {
                    setLogin(false);
                }
            }).finally(() => setLogLoading(false));
        };

        isLoggedIn();

        const setIntervalId = setInterval(isLoggedIn, 25000);

        return () => clearInterval(setIntervalId);
    }, []);

    return { login, name, logLoading };
}