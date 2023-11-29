import { useState } from "react";
import logo from "/whiteLogo.png";
import Input from "../../components/Input";
import Button from "../../components/PrimaryButton";


export default function CreateAccount() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [strongPassword, setStrongPassword] = useState(false);

    const testForm = () => {
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;

        const test = passwordRegex.test(password);
        console.log(test);

        if (test) {
            console.log("É forte");
            setStrongPassword(true);
        } else {
            setStrongPassword(false);
        }
    };

    return (
        <main className="flex justify-center h-screen items-center">
            <div className="lg:border border-gray-300 xl:h-3/4 xl:w-4/6 rounded-xl sm:flex items-center w-screen h-screen">
                <div className="sm:w-1/3 bg-primary sm:h-full sm:rounded-r-md sm:py-28 flex w-screen h-40">
                    <img src={logo} alt="Click Counter logo" className="sm:w-11/12 w-60 m-auto" />
                </div>

                <form className="sm:w-2/4 sm:h-5/6 h-4/6 flex flex-wrap justify-center p-5 m-auto w-full">
                    <div className="flex flex-col w-full">
                        <label htmlFor="name" className="font-nunito text-primary text-lg">Nome completo</label>
                        <Input type="text" placeholder="Digite seu nome" required={true} id="name" onChange={(e) => setName(e.target.value)} />
                    </div>

                    <div className="flex flex-col w-full">
                        <label htmlFor="email" className="font-nunito text-primary text-lg">E-mail</label>
                        <Input type="email" placeholder="Digite seu e-mail" required={true} id="email" onChange={(e) => setEmail(e.target.value)} />
                    </div>

                    <div className="flex flex-col w-full">
                        <label htmlFor="phone" className="font-nunito text-primary text-lg">Telefone</label>
                        <Input type="tel" placeholder="(99) 99999-9999" required={true} id="phone" mask="(99) 99999-9999" onChange={(e) => setPhone((e.target.value).replace(/[\s()-]+/g, ''))} />
                    </div>

                    <div className="flex flex-col w-full">
                        <label htmlFor="password" className="font-nunito text-primary text-lg">Senha</label>
                        <Input type="password" placeholder="Digite sua senha" required={true} id="password" onChange={(e) => {
                            setPassword(e.target.value);
                            testForm();
                        }} />
                        {strongPassword ? (
                            <p className="font-nunito text-sm text-green-500">Senha forte</p>
                        ) : (
                            <p className="font-nunito text-sm text-red-500">A senha não é forte o suficiente</p>
                        )}
                    </div>

                    <div className="flex w-full sm:gap-6 gap-2 items-center sm:flex-row flex-col">
                        {strongPassword && <Button value="Criar conta" />}
                        <a href="/login" className="font-nunito text-sm text-primary">Já tenho uma conta</a>
                    </div>
                </form>
            </div>
        </main>
    );
}