import Main from "../../components/Main";
import React, { useContext, useEffect, useState } from "react";
import { LoginContext } from "../../context/LoginContext";
import Button from "../../components/PrimaryButton";
import Input from "../../components/Input";
import Modal from "../../components/Modal";
import server from "../../api/server";
import Loading from "../../components/Loading";

interface profileProps {
    profile: {
        name: string,
        email: string,
        phone: string
    },
    statusCode: number
}

interface updateResponseProps {
    message: string;
    statusCode: number;
}

interface modalProps {
    closeText: string,
    message?: string,
    icon?: "success" | "error" | "warning",
    active: boolean
}


export default function Profile() {
    const { login } = useContext(LoginContext);
    const [readOnly, setReadOnly] = useState(true);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");
    const [strongPassword, setStrongPassword] = useState(false);
    const [editPassword, setEditPassword] = useState(false);
    const [validForm, setValidForm] = useState(false);
    const [errorMessage, setErrorMessage] = useState({} as modalProps);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        if (readOnly === true) {
            server.get("/users/profile")
                .then((response) => {
                    const profile: profileProps = response.data;

                    setName(profile.profile.name);
                    setEmail(profile.profile.email);
                    setPhone(profile.profile.phone);
                });
        }
        setLoading(false);
    }, [readOnly]);


    useEffect(() => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
        const phoneRegex = /^\d{10,11}$/;

        const testPassword = editPassword ? passwordRegex.test(password) : true;
        const testPhone = phoneRegex.test(phone);


        testPassword ? setStrongPassword(true) : setStrongPassword(false);
        name && email && testPhone && testPassword && currentPassword ? setValidForm(true) : setValidForm(false);

    }, [name, email, phone, password, currentPassword, editPassword]);


    useEffect(() => {
        if (readOnly) {
            setEditPassword(false);
        }
    }, [readOnly]);

    useEffect(() => {
        if (!editPassword) {
            setPassword("");
        }
    }, [editPassword]);


    const updateProfile = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        const request = await server.put("/users/update", {
            name,
            email,
            phone,
            newPassword: password ? password : null,
            currentPassword
        });

        const response: updateResponseProps = request.data;

        if (response.statusCode === 400) {
            setErrorMessage({
                message: "Campo inválido ou e-mail já em uso.",
                closeText: "OK",
                icon: "error",
                active: true
            });
        }

        if (response.statusCode === 200) {
            setErrorMessage({
                message: "Perfil atualizado com sucesso",
                closeText: "OK",
                icon: "success",
                active: true
            });
        }

        setReadOnly(true);
        setLoading(false);
    };

    return (
        <>
            {errorMessage.active && <Modal buttonText={errorMessage.closeText} message={errorMessage.message} icon={errorMessage.icon} funcToClose={() => setErrorMessage({ active: false, closeText: "" })} />}
            {loading && <Loading />}
            <Main page="profile">
                {login && (
                    <div className="h-full sm:w-full w-screen flex items-center justify-center">
                        <div className="w-4/6 h-full flex justify-center items-center">
                            <section className="w-5/12 h-full flex justify-center">
                                <div className="w-full h-80 flex items-center justify-center flex-col gap-10">
                                    <button className={`${readOnly ? "bg-primary" : "bg-red-500"} rounded-lg w-4/5 h-10 text-white font-bold font-nunito p-2 flex items-center justify-center gap-5`} onClick={() => readOnly ? setReadOnly(false) : setReadOnly(true)}>
                                        <img src={`${readOnly ? "/Pencil.png" : "/Close.png"}`} />
                                        <span>{`${readOnly ? "Editar Perfil" : "Cancelar edição"}`}</span>
                                    </button>

                                    {!readOnly && (
                                        <button className={`${!editPassword ? "bg-yellow-600" : "bg-slate-600"} rounded-lg w-4/5 h-10 text-white font-bold font-nunito p-2 flex items-center justify-center gap-5`} onClick={() => editPassword ? setEditPassword(false) : setEditPassword(true)}>
                                            <img src={`${!editPassword ? "/Pencil.png" : "/Close.png"}`} />
                                            <span>{`${!editPassword ? "Alterar senha" : "Não alterar senha"}`}</span>
                                        </button>
                                    )}
                                </div>
                            </section>


                            <form className="w-7/12 h-full flex flex-col gap-4 p-7" onSubmit={updateProfile}>
                                <div className="flex flex-col w-full">
                                    <label htmlFor="name" className="font-nunito text-primary text-lg">Nome completo</label>
                                    <Input type="text" placeholder="Digite seu nome" required={true} id="name" onChange={(e) => setName(e.target.value)} readonly={readOnly} value={name} />
                                </div>

                                <div className="flex flex-col w-full">
                                    <label htmlFor="email" className="font-nunito text-primary text-lg">E-mail</label>
                                    <Input type="email" placeholder="Digite seu e-mail" required={true} id="email" onChange={(e) => setEmail(e.target.value)} readonly={readOnly} value={email} />
                                </div>

                                <div className="flex flex-col w-full">
                                    <label htmlFor="phone" className="font-nunito text-primary text-lg">Telefone</label>
                                    <Input type="tel" placeholder="(99) 99999-9999" required={true} id="phone" mask="(99) 99999-9999" onChange={(e) => setPhone((e.target.value).replace(/[\s()-]+/g, ''))} readonly={readOnly} value={phone} />
                                </div>

                                {editPassword && (
                                    <div className="flex flex-col w-full">
                                        <label htmlFor="password" className="font-nunito text-primary text-lg">Nova senha</label>
                                        <Input type="text" placeholder="Digite sua nova senha" required={true} id="password" onChange={(e) => setPassword(e.target.value)} readonly={readOnly} />

                                        {strongPassword ? (
                                            <p className="font-nunito text-sm text-green-500">Senha forte</p>
                                        ) : (
                                            <p className="font-nunito text-sm text-red-500">A senha não é forte o suficiente</p>
                                        )}
                                    </div>
                                )}

                                {!readOnly && (
                                    <div className="flex flex-col w-full">
                                        <label htmlFor="password" className="font-nunito text-primary text-lg">Senha atual</label>
                                        <Input type="password" placeholder="Digite sua senha atual" required={true} id="password" onChange={(e) => setCurrentPassword(e.target.value)} readonly={readOnly} />
                                    </div>

                                )}

                                <div className="flex w-full sm:gap-6 gap-2 items-center sm:flex-row flex-col">
                                    {validForm && !readOnly && <Button value="Confirmar alteração" />}
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {!login && (
                    <div className="h-full sm:w-full w-screen">
                        <div className="h-full m-auto w-3/4 flex items-center justify-center flex-col gap-14">
                            <h1 className="font-nunito text-4xl text-center">Para visualizar seu perfil, faça login.</h1>
                            <Button value="Login" onClick={() => window.location.replace("/login")} />
                        </div>
                    </div>
                )}
            </Main>
        </>
    );

}