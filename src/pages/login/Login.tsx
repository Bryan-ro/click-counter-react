import server from "../../api/server";
import axios, { AxiosResponse } from "axios";
import Input from "../../components/Input";
import Button from "../../components/PrimaryButton";
import Modal from "../../components/Modal";
import Loading from "../../components/Loading";
import logo from "/whiteLogo.png";
import React, { useState } from "react";
import Cookie from "universal-cookie";

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
    const [ModalMessage, setModalMessage] = useState({
        active: false,
        message: "",
        icon: "" as "warning" | "success" | "error"
    });
    const [loading, setLoading] = useState(false);

    const cookie = new Cookie();

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
                setModalMessage({
                    active: true,
                    message: "Usuário ou senha incorreta.",
                    icon: "error"
                });
            } else {
                cookie.set("token", login.data.token);
                window.location.replace("/");
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.code === "ERR_NETWORK") setModalMessage({
                    active: true,
                    message: "Sem conexão com o servidor. Tente novamente mais tarde",
                    icon: "error"
                });
            }
        }

        setLoading(false);
    };

    return (
        <main className="flex justify-center h-screen items-center">
            {ModalMessage.active && (
                <Modal icon={ModalMessage.icon} message={ModalMessage.message} buttonText="OK" funcToClose={() => setModalMessage({
                    active: false,
                    message: "",
                    icon: "success"
                })} />
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
                        <a onClick={() => {
                            if (email) {
                                server.patch(`/users/password/reset/${email}`);
                                setModalMessage({
                                    active: true,
                                    icon: "warning",
                                    message: "Uma nova senha foi enviada para o seu e-mail. Caso não receba, verifique se digitou seu e-mail corretamente."
                                });
                            } else {
                                setModalMessage({
                                    active: true,
                                    icon: "error",
                                    message: "Digite seu e-mail antes de clicar em 'esqueci minha senha'"
                                });
                            }
                        }} className="font-nunito text-sm indent-2 text-primary cursor-pointer">Esqueci minha senha</a>
                    </div>

                    <div className="flex w-full sm:gap-6 gap-2 items-center sm:flex-row flex-col">
                        <Button value="Entrar" />
                        <a href="/account/create" className="font-nunito text-sm text-primary">Não tenho uma conta</a>
                    </div>
                </form>
            </div >
        </main >
    );
}