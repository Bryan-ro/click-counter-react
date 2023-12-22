import logo from "/purpleLogo.png";
import { useState, useEffect, ReactNode, useContext } from "react";
import { LoginContext } from "../context/LoginContext";
import Button from "./PrimaryButton";
import server from "../api/server";
import { useNavigate } from "react-router-dom";

interface MainProps {
    page: "home" | "dashboard" | "profile";
    children: ReactNode
}

export default function Main({ children, ...props }: MainProps) {
    const optionStyle = "w-full h-11 rounded-r-md flex items-center p-3 gap-5 cursor-pointer";
    const [navVisibility, setNavVisibility] = useState(false);
    const { login, name } = useContext(LoginContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (window.innerWidth > 640) {
            setNavVisibility(true);
        }
    }, []);

    const logOut = async () => {
        await server.post("/users/log-out");
        window.location.reload();
    };

    return (
        <main className="flex h-full">
            <div className="bg-white h-full sm:w-72 w-screen select-none">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="w-14 h-12 sm:hidden block absolute z-40" viewBox="0 0 16 16" onClick={() => navVisibility ? setNavVisibility(false) : setNavVisibility(true)}>
                    <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5" />
                </svg>
                {navVisibility && (
                    <nav className="sm:w-72 w-screen animate-fade-in sm:relative absolute h-full bg-white">
                        <div className="w-full border-zinc-300 border-b-2 h-28 flex justify-center items-center sm:mt-12 p-3 mt-10">
                            <img src={logo} alt="CLick Counter" className="sm:w-full w-2/3" />
                        </div>

                        <div className="h-full mt-4">
                            <div className={`${optionStyle} ${props.page === "home" ? "text-primary bg-slate-200" : ""}`} onClick={() => props.page === "home" ? null : navigate("/")}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-link-45deg" viewBox="0 0 16 16">
                                    <path d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1.002 1.002 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4.018 4.018 0 0 1-.128-1.287z" />
                                    <path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243z" />
                                </svg>
                                <p className="font-nunito">Encurtar link</p>
                            </div>
                            <div className={`${optionStyle} ${props.page === "dashboard" ? "text-primary" : ""}`} onClick={() => props.page === "dashboard" ? "" : navigate("/dashboard")}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-grid" viewBox="0 0 16 16">
                                    <path d="M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5zM2.5 2a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5zm6.5.5A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5zM1 10.5A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5zm6.5.5A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5z" />
                                </svg>
                                <p className="font-nunito">Estatisticas</p>
                            </div>

                            {login && (
                                <div className={`${optionStyle} ${props.page === "profile" ? "text-primary" : ""}`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                                        <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" />
                                    </svg>
                                    <p className="font-nunito">Perfil</p>
                                </div>
                            )}

                            {login && (
                                <div className="sm:hidden flex justify-center items-end gap-24 h-[calc(100%-22rem)]">
                                    <h1 className="font-nunito text-lg">{name}</h1>

                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={() => logOut()}>
                                        <path d="M11.25 6C11.6642 6 12 5.66421 12 5.25C12 4.83579 11.6642 4.5 11.25 4.5L5.25 4.5C4.2835 4.5 3.5 5.2835 3.5 6.25L3.5 18.25C3.5 19.2165 4.2835 20 5.25 20L11.25 20C11.6642 20 12 19.6642 12 19.25C12 18.8358 11.6642 18.5 11.25 18.5L5.25 18.5C5.11193 18.5 5 18.3881 5 18.25L5 6.25C5 6.11193 5.11193 6 5.25 6L11.25 6Z" fill="#2B2B43" />
                                        <path fillRule="evenodd" clipRule="evenodd" d="M8.74692 9.88478C8.05657 9.88478 7.49692 10.4444 7.49692 11.1348L7.49692 13.3753C7.49692 14.0657 8.05657 14.6253 8.74692 14.6253L13.3595 14.6253C13.366 14.6987 13.3729 14.7721 13.38 14.8455L13.434 15.4014C13.5165 16.2495 14.4171 16.7574 15.1855 16.3892C16.8197 15.606 18.2992 14.5342 19.5526 13.2255L19.6518 13.1219C20.1161 12.6372 20.1161 11.8729 19.6518 11.3882L19.5526 11.2846C18.2992 9.97587 16.8197 8.90413 15.1855 8.12093C14.4171 7.75267 13.5165 8.26058 13.434 9.10869L13.38 9.66457C13.3729 9.73795 13.366 9.81136 13.3595 9.88478L8.74692 9.88478ZM14.0549 11.3848C14.3213 11.3848 14.5567 11.2455 14.6899 11.034C14.7548 10.931 14.7954 10.8109 14.8034 10.6815C14.8216 10.3906 14.8448 10.1 14.873 9.80968L14.8887 9.64834C15.9247 10.1823 16.8868 10.8472 17.7516 11.6261C17.976 11.8282 18.1938 12.0379 18.4046 12.255C17.3811 13.3091 16.1935 14.1893 14.8887 14.8618L14.873 14.7004C14.8448 14.4101 14.8216 14.1195 14.8034 13.8286C14.7788 13.4333 14.451 13.1253 14.0549 13.1253L8.99692 13.1253L8.99692 11.3848L14.0549 11.3848Z" fill="#2B2B43" />
                                    </svg>
                                </div>
                            )}

                            {!login && (
                                <div className="sm:hidden flex justify-center items-end gap-24 h-[calc(100%-22rem)]">
                                    <Button value="Login" onClick={() => window.location.href = "/login"} />
                                </div>
                            )}
                        </div>
                    </nav>
                )}
            </div>

            <div className="w-screen h-full">
                <div className="w-full h-16 flex items-center justify-end">


                    {login && (
                        <>
                            <h1 className="font-nunito text-lg sm:block hidden">{name}</h1>

                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="m-28 sm:block hidden cursor-pointer" onClick={() => logOut()}>
                                <path d="M11.25 6C11.6642 6 12 5.66421 12 5.25C12 4.83579 11.6642 4.5 11.25 4.5L5.25 4.5C4.2835 4.5 3.5 5.2835 3.5 6.25L3.5 18.25C3.5 19.2165 4.2835 20 5.25 20L11.25 20C11.6642 20 12 19.6642 12 19.25C12 18.8358 11.6642 18.5 11.25 18.5L5.25 18.5C5.11193 18.5 5 18.3881 5 18.25L5 6.25C5 6.11193 5.11193 6 5.25 6L11.25 6Z" fill="#2B2B43" />
                                <path fillRule="evenodd" clipRule="evenodd" d="M8.74692 9.88478C8.05657 9.88478 7.49692 10.4444 7.49692 11.1348L7.49692 13.3753C7.49692 14.0657 8.05657 14.6253 8.74692 14.6253L13.3595 14.6253C13.366 14.6987 13.3729 14.7721 13.38 14.8455L13.434 15.4014C13.5165 16.2495 14.4171 16.7574 15.1855 16.3892C16.8197 15.606 18.2992 14.5342 19.5526 13.2255L19.6518 13.1219C20.1161 12.6372 20.1161 11.8729 19.6518 11.3882L19.5526 11.2846C18.2992 9.97587 16.8197 8.90413 15.1855 8.12093C14.4171 7.75267 13.5165 8.26058 13.434 9.10869L13.38 9.66457C13.3729 9.73795 13.366 9.81136 13.3595 9.88478L8.74692 9.88478ZM14.0549 11.3848C14.3213 11.3848 14.5567 11.2455 14.6899 11.034C14.7548 10.931 14.7954 10.8109 14.8034 10.6815C14.8216 10.3906 14.8448 10.1 14.873 9.80968L14.8887 9.64834C15.9247 10.1823 16.8868 10.8472 17.7516 11.6261C17.976 11.8282 18.1938 12.0379 18.4046 12.255C17.3811 13.3091 16.1935 14.1893 14.8887 14.8618L14.873 14.7004C14.8448 14.4101 14.8216 14.1195 14.8034 13.8286C14.7788 13.4333 14.451 13.1253 14.0549 13.1253L8.99692 13.1253L8.99692 11.3848L14.0549 11.3848Z" fill="#2B2B43" />
                            </svg>
                        </>

                    )}

                    {!login && (
                        <div className="w-60 sm:block hidden">
                            <Button value="Login" onClick={() => window.location.href = "/login"} />
                        </div>
                    )}

                    <div className="w-52 border-zinc-300 h-28 flex justify-center items-center p-3 sm:hidden">
                        <img src={logo} alt="CLick Counter" />
                    </div>
                </div>

                <div className="w-full h-[calc(100vh-4rem)]">
                    {children}
                </div>
            </div>
        </main>
    );
}