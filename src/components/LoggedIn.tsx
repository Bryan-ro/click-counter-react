import { useEffect } from "react";
import server from "../api/server";

interface LoggedInProps {
    redirectTo: string;
    redirectIfLoggedIn: boolean;
}

export default function LoggedIn(props: LoggedInProps) {
    useEffect(() => {
        server.post("/users/already-logged-in", {}, {
            withCredentials: true
        }).then((response) => {
            if (response.status === 200 && props.redirectIfLoggedIn) {
                window.location.replace(props.redirectTo);
            } else if (response.status !== 200 && !props.redirectIfLoggedIn) {
                window.location.replace(props.redirectTo);
            }
        });
    }, [props.redirectIfLoggedIn, props.redirectTo]);


    return (
        <></>
    );
}