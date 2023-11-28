import { useEffect } from "react";
import server from "../api/server";

interface LoggedInProps {
    redirectTo: string;
    redirectIfLoggedIn: boolean;
}

export default function LoggedIn(props: LoggedInProps) {
    useEffect(() => {
        const credentialsString = localStorage.getItem("credentials");

        if (credentialsString) {
            const credentials: userCredentialsProps = JSON.parse(credentialsString);

            server.post("/users/already-logged-in", {}, {
                headers: {
                    authorization: "Bearer " + credentials.token
                }
            }).then((response) => {
                if (response.status === 200 && props.redirectIfLoggedIn) {
                    window.location.replace(props.redirectTo);
                } else if (response.status !== 200 && !props.redirectIfLoggedIn) {
                    window.location.replace(props.redirectTo);
                }
            });
        }
    }, [props.redirectIfLoggedIn, props.redirectTo]);


    return (
        <span></span>
    );
}