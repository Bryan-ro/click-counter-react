import success from "/check.png";
import error from "/error.png";
import warning from "/warning.png";
import Button from "../components/PrimaryButton";

interface ModalProps {
    message?: string;
    icon?: "error" | "warning" | "success";
    funcToClose?: any;
    buttonText: string;
}

export default function Modal(props: ModalProps) {
    return (
        <div className="absolute w-screen h-screen bg-zinc-600/50 flex justify-center items-center z-50">
            <div className="bg-zinc-300 sm:w-2/5 sm:h-2/4 w-full h-1/3 rounded-xl flex justify-center items-center flex-col gap-5 animate-fade-in">
                <div className="sm:w-1/4 w-1/5 animate-pulse">
                    {props.icon === "success" && (
                        <img src={success} />
                    )}

                    {props.icon === "error" && (
                        <img src={error} />
                    )}

                    {props.icon === "warning" && (
                        <img src={warning} />
                    )}
                </div>

                <div className="w-3/4">
                    <h1 className="font-nunito text-xl text-center">{props.message}</h1>
                </div>

                <Button value={props.buttonText} onClick={props.funcToClose} />

            </div>
        </div>
    );
}