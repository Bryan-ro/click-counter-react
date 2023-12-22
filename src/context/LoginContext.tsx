import { useState, useEffect, createContext } from "react";
import server from "../api/server";
import { ReactNode } from "react";
import { useLocation } from "react-router-dom";


interface LoginProps {
    login: boolean;
    name: string;
}

type Children = { children: ReactNode }

export const LoginContext = createContext({} as LoginProps);

export const LoginProvider = ({ children }: Children) => {
    const [login, setLogin] = useState(false);
    const [name, setName] = useState("");
    const location = useLocation();

    useEffect(() => {
        const isLoggedIn = () => {
            server.post("/users/already-logged-in", {}, {}).then((response) => {
                if (response.status === 200) {
                    setLogin(true);
                    setName(response.data.user);
                } else {
                    setLogin(false);
                }
            });
        };

        isLoggedIn();

        const setIntervalId = setInterval(isLoggedIn, 30000);

        return () => clearInterval(setIntervalId);
    }, [location.pathname]);

    return <LoginContext.Provider value={{ login, name }}>{children}</LoginContext.Provider>;
};