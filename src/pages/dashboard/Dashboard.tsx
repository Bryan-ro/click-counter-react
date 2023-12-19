import server from "../../api/server";
import Main from "../../components/Main";
import Button from "../../components/PrimaryButton";
import useLogin from "../../hooks/useLogin";
import { useState, useEffect } from "react";

interface urlsProps {
    originalUrl: string;
    shortUrl: string;
    clicksQuantity: number;
}


export default function Dashboard() {
    const { login } = useLogin();
    const [ownUrls, setOwnUrls] = useState([] as urlsProps[]);
    let lineTableColor = 0;

    useEffect(() => {
        server.get("/urls").then((response) => {
            setOwnUrls(response.data.urls);
        });
    }, []);

    return (
        <Main page="dashboard" >
            {!login && (
                <div className="h-full">
                    <div className="h-full m-auto w-3/4 flex items-center justify-center flex-col gap-14">
                        <h1 className="font-nunito text-4xl text-center">Para ter acesso às estatisticas de suas urls ecurtadas, clique abaixo e faça login.</h1>
                        <Button value="Login" onClick={() => window.location.replace("/login")} />
                    </div>
                </div>
            )}

            <section className="h-full flex items-center justify-center">
                <div className="w-5/6 h-5/6">
                    <div className="flex w-2/4 gap-6">
                        <h1 className="font-nunito text-3xl">Minhas Urls</h1>
                        <div className="w-2/4 flex justify-start items-center">
                            <Button value={"Encurtar"} onClick={() => window.location.href = "/"} />
                        </div>
                    </div>

                    <section className="h-full">
                        <div className="w-full m-4 text-center font-nunito flex flex-col">
                            <div className="border-b h-14 text-primary flex items-center justify-center mb-5">
                                <div className="w-1/3">Url original</div>
                                <div className="w-1/3">Url encurtada</div>
                                <div className="w-1/3">Quantidade de Clicks</div>
                            </div>
                            {
                                ownUrls.map((url) => {
                                    lineTableColor++;

                                    return (
                                        <div className={`h-16 flex items-center justify-center ${lineTableColor % 2 === 0 ? "" : "bg-zinc-200"} rounded-sm p-6`}>
                                            <div className="w-1/3"><a href={url.originalUrl}>{url.originalUrl.substr(0, 29)}</a></div>
                                            <div className="w-1/3"><a href={url.shortUrl}>{url.shortUrl}</a></div>
                                            <div className="w-1/3">{url.clicksQuantity}</div>
                                        </div>
                                    );
                                })
                            }
                        </div>
                    </section>
                </div>
            </section>
        </Main>
    );
}