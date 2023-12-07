import Main from "../../components/Main";
import Input from "../../components/Input";

export default function Home() {
    return (
        <Main page="home">
            <div className="w-full h-full flex justify-center items-center">
                <div className="border w-4/5 h-3/4 flex justify-center items-center">
                    <div className="flex flex-col w-10/12 gap-2">
                        <label htmlFor="url" className="font-nunito text-primary">Insira sua URL</label>
                        <Input type="url" id="url" placeholder="Insira sua URL" />
                        <table className="h-6 w-2/6 rounded-full border flex justify-center">
                            <th className="border-r">Aleatório</th>
                            <th className="border-l">Personalizado</th>
                        </table>
                    </div>
                </div>
            </div>
        </Main>
    );
}