import server from "../../api/server";
import axios, { AxiosResponse } from "axios";
import Input from "../../components/Input";
import Button from "../../components/PrimaryButton";
import Modal from "../../components/Modal";
import Loading from "../../components/Loading";
import LoggedIn from "../../components/LoggedIn";
import logo from "/whiteLogo.png";
import React, { useState } from "react";


interface loginResponseProps extends AxiosResponse {
    data: {
        message: string;
        token: string;
        user: string;
        statusCode: number;
    }
}

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const verifyCredentials = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        try {
            const login: loginResponseProps = await server.post("/users/login", {}, {
                headers: {
                    authorization: "Basic " + btoa(`${email}:${password}`)
                }
            });

            if (login.status === 401) {
                setErrorMessage("Usuário ou senha incorreta.");
            } else {
                localStorage.setItem("credentials", JSON.stringify(login.data));
                window.location.replace("/");
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.code === "ERR_NETWORK") setErrorMessage("Sem conexão com o servidor. Tente novamente mais tarde");
            }
        }

        setLoading(false);
    };

    return (
        <main className="flex justify-center h-screen items-center">
            <LoggedIn redirectTo="/" redirectIfLoggedIn={true} />

            {errorMessage && (
                <Modal icon="error" message={errorMessage} buttonText="OK" funcToClose={() => setErrorMessage("")} />
            )}

            {
                loading && (
                    <Loading />
                )
            }

            <div className="lg:border border-gray-300 xl:h-3/4 xl:w-4/6 rounded-xl sm:flex items-center w-screen h-screen">
                <div className="sm:w-1/3 bg-primary sm:h-full sm:rounded-r-md sm:py-28 flex w-screen h-40">
                    <img src={logo} alt="Click Counter logo" className="sm:w-11/12 w-60 m-auto" />
                </div>

                <form className="sm:w-2/4 h-80 flex flex-wrap justify-center p-5 m-auto w-full" onSubmit={verifyCredentials}>
                    <div className="flex flex-col w-full">
                        <label htmlFor="email" className="font-nunito text-primary text-lg">E-mail</label>
                        <Input type="email" placeholder="Digite seu e-mail" required={true} id="email" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} />
                    </div>

                    <div className="flex flex-col w-full">
                        <label htmlFor="password" className="font-nunito text-primary text-lg">Senha</label>
                        <Input type="password" placeholder="Digite sua senha" required={true} id="password" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} />
                        <a href="#" className="font-nunito text-sm indent-2 text-primary">Esqueci minha senha</a>
                    </div>

                    <div className="flex w-full sm:gap-6 gap-2 items-center sm:flex-row flex-col">
                        <Button value="Entrar" />
                        <a href="#" className="font-nunito text-sm text-primary">Não tenho uma conta</a>
                    </div>
                </form>
            </div>
        </main>
    );
}