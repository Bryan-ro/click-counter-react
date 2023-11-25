import Input from "../../components/Input";
import Button from "../../components/PrimaryButton";
import logo from "/whiteLogo.png";
import React, { useState } from "react";

export default function Login () {
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");

    const credentials = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log({
            email: email, 
            password: password
        });
    };

    return (
        <main className="flex justify-center h-screen items-center">
            <div className="lg:border border-gray-300 xl:h-3/4 xl:w-4/6 rounded-xl sm:flex items-center w-screen h-screen">
                <div className="sm:w-1/3 bg-primary sm:h-full sm:rounded-r-md sm:py-28 flex w-screen h-40">
                    <img src={logo} alt="Click Counter logo" className="sm:w-11/12 w-60 m-auto"/>
                </div>

                <form className="sm:w-2/4 h-80 flex flex-wrap justify-center p-5 m-auto w-full" onSubmit={credentials}>
                    <div className="flex flex-col w-full">
                        <label htmlFor="email" className="font-nunito text-primary text-lg">E-mail</label>
                        <Input type="email" placeholder="Digite seu e-mail" id="email" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}/>
                    </div>
                    
                    <div className="flex flex-col w-full">
                        <label htmlFor="password" className="font-nunito text-primary text-lg">Senha</label>
                        <Input type="password" placeholder="Digite sua senha" id="password" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} />
                        <a href="#" className="font-nunito text-sm indent-2 text-primary">Esqueci minha senha</a>
                    </div>

                    <Button value="Entrar"/>
                </form>
            </div>
        </main>
    );
}