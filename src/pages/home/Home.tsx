import { useState } from "react";
import Main from "../../components/Main";
import Input from "../../components/Input";
import Button from "../../components/PrimaryButton";
import Modal from "../../components/Modal";
import server from "../../api/server";
import useLogin from "../../hooks/useLogin";


export default function Home() {
    const [generateType, setGenerateType] = useState("random");
    const [url, setUrl] = useState("");
    const [customUrl, setCustomUrl] = useState("");
    const [generatedUrl, setGeneratedUrl] = useState("");
    const [modalMessage, setModalMessage] = useState({
        active: false,
        message: "",
        icon: "" as "warning" | "success" | "error",
        buttonText: ""
    });
    const { login } = useLogin();

    const generate = async () => {
        if (generateType === "random") {
            const randomUrl = await server.post("/short/random", {
                originalUrl: url
            });

            if (randomUrl.status === 400) {
                setModalMessage({
                    active: true,
                    icon: "error",
                    message: "A url é inválida. Tente novamente.",
                    buttonText: "OK"
                });
            } else {
                setGeneratedUrl(randomUrl.data.shortUrl);
            }
        }

        if (generateType === "custom") {
            const randomUrl = await server.post("/short/custom", {
                originalUrl: url,
                customUrl: customUrl.replace("/", "")
            });

            if (randomUrl.status !== 200) {
                setModalMessage({
                    active: true,
                    icon: "error",
                    message: "A url é invalida, ou a url personalizada já está em uso, tente outra.",
                    buttonText: "OK"
                });
            } else {
                setGeneratedUrl(randomUrl.data.shortUrl);
            }
        }
    };

    return (
        <>
            {modalMessage.active && (
                <Modal icon={modalMessage.icon} message={modalMessage.message} funcToClose={() => setModalMessage({ active: false, icon: "error", message: "", buttonText: "" })} buttonText={modalMessage.buttonText} />
            )}
            <Main page="home">
                <div className="sm:w-full w-screen h-full flex justify-center items-center">
                    <div className="w-4/5 h-3/4 flex justify-center flex-col items-center">

                        <div className="flex flex-col w-10/12 gap-2">
                            <label htmlFor="url" className="font-nunito text-primary">Insira sua URL</label>
                            <Input type="url" id="url" placeholder="Insira sua URL" onChange={(e) => setUrl(e.target.value)} />

                            {generateType === "custom" && (
                                <>
                                    <label htmlFor="url" className="font-nunito text-primary">Url Personalizada</label>
                                    <Input type="url" id="url" placeholder="Insira sua URL" mask="/********************" onChange={(e) => setCustomUrl(e.target.value)} />
                                </>
                            )}

                            <div className="h-7 sm:w-3/6 rounded-full border flex justify-center cursor-pointer border-collapse select-none">
                                <div className={`w-full rounded-l-full ${generateType === "random" ? "bg-primary text-white" : ""} transition`} onClick={() => setGenerateType("random")}><p className="text-center font-nunito">Aleatório</p></div>
                                <div className={`w-full rounded-r-full ${generateType === "custom" ? "bg-primary text-white" : ""}`} onClick={() => {
                                    login ? setGenerateType("custom") : setModalMessage({ active: true, message: "Para criar uma url personalizada, é necessário fazer login", icon: "warning", buttonText: "Fechar" });
                                }}><p className="text-center font-nunito">Personalizado</p></div>
                            </div>
                        </div>

                        <div className="sm:w-4/6 w-full h-36 flex justify-center items-center">
                            <Button value="Encurtar" onClick={generate} />
                        </div>

                        {generatedUrl && (
                            <div className="sm:w-3/6 sm:p-0 p-5 w-screen border-2 rounded-md  flex justify-center items-center flex-col gap-6">
                                <div className="flex flex-col items-center">
                                    <label className="font-nunito text-primary">Url encurtada</label>
                                    <a href={generatedUrl} className="text-primary">{generatedUrl}</a>
                                </div>

                                <div className="text-center sm:block hidden">
                                    <label className="font-nunito text-primary">Url original</label>
                                    <p>{url}</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </Main>
        </>
    );
}