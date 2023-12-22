import server from "../../api/server";
import Main from "../../components/Main";
import Button from "../../components/PrimaryButton";
import { LoginContext } from "../../context/LoginContext";
import { useState, useEffect, useContext } from "react";
import Loading from "../../components/Loading";

interface urlsProps {
    originalUrl: string;
    shortUrl: string;
    shortUrlCode: string;
    clicksQuantity: number;
}

export default function Dashboard() {
    const { login } = useContext(LoginContext);
    const [ownUrls, setOwnUrls] = useState([] as urlsProps[]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (login) {
            setLoading(true);
            server.get("/urls").then((response) => {
                setOwnUrls(response.data.urls);
            }).finally(() => setLoading(false));
        }
    }, [login]);

    return (
        <>
            {loading && <Loading />}
            <Main page="dashboard" >
                {!login && (
                    <div className="h-full sm:w-full w-screen">
                        <div className="h-full m-auto w-3/4 flex items-center justify-center flex-col gap-14">
                            <h1 className="font-nunito text-4xl text-center">Para ter acesso às estatisticas de suas urls ecurtadas, clique abaixo e faça login.</h1>
                            <Button value="Login" onClick={() => window.location.replace("/login")} />
                        </div>
                    </div>
                )}

                {login && (
                    <section className="h-full sm:w-full w-screen flex items-center justify-center">
                        <div className="w-5/6 h-5/6">
                            <div className="flex sm:w-2/4 gap-6">
                                <h1 className="font-nunito text-3xl">Minhas Urls</h1>
                                <div className="sm:w-2/4 w-full flex sm:justify-start justify-center items-center">
                                    <Button value={"Encurtar"} onClick={() => window.location.href = "/"} />
                                </div>
                            </div>

                            <section className="h-full">
                                <div className="w-full mt-4 text-center font-nunito flex flex-col">
                                    <div className="border-b h-14 text-primary flex items-center justify-center mb-5">
                                        <div className="w-1/3 sm:block hidden">Url original</div>
                                        <div className="sm:w-1/3 w-1/2">Url encurtada</div>
                                        <div className="sm:w-1/3 w-1/2">Quantidade de Clicks</div>
                                    </div>
                                    {
                                        ownUrls.map((url, index) => {
                                            return (
                                                <div key={index} className={`h-16 flex items-center justify-center whitespace-nowrap  ${index % 2 === 0 ? "bg-zinc-200" : ""} rounded-sm sm:p-6 p-0`}>
                                                    <div className="w-1/3 sm:block hidden"><a href={url.originalUrl}>{url.originalUrl.substr(0, 29)}</a></div>
                                                    <div className="w-1/2 text-primary"><a href={url.shortUrl}>{`/${url.shortUrlCode}`}</a></div>
                                                    <div className="sm:w-1/3 w-1/2">{url.clicksQuantity}</div>
                                                </div>
                                            );
                                        })
                                    }
                                </div>
                            </section>
                        </div>
                    </section>
                )}
            </Main>
        </>
    );
}