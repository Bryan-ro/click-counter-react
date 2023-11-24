import Input from "../../components/Input";
import Button from "../../components/PrimaryButton";
import logo from "/whiteLogo.png";

export default function Login () {
    return (
        <main className="flex justify-center h-screen items-center">
            <div className="border border-gray-300 h-3/4 w-4/6 rounded-xl flex items-center">
                <div className="w-1/3 bg-primary h-full rounded-l-md py-28 flex">
                    <img src={logo} alt="Click Counter logo" className="w-11/12 m-auto"/>
                </div>

                <form className="w-2/4 h-96 flex flex-wrap justify-center p-5 m-auto">
                    <div className="flex flex-col w-full">
                        <label htmlFor="email" className="font-nunito text-primary text-lg">E-mail</label>
                        <Input type="text" placeholder="Digite seu e-mail" id="email" />
                    </div>
                    
                    <div className="flex flex-col w-full">
                        <label htmlFor="password" className="font-nunito text-primary text-lg">Senha</label>
                        <Input type="password" placeholder="Digite sua senha" id="password" />
                        <a href="#" className="font-nunito text-sm indent-2 text-primary">Esqueci minha senha</a>
                    </div>

                    <Button value="Entrar"/>
                </form>
            </div>
        </main>
    );
}