import { MouseEventHandler } from "react";

interface ButtonProps {
    value: string;
    onClick?: MouseEventHandler<HTMLElement>;
}

export default function PrimaryButton (props: ButtonProps) {
    return (
        <button className="bg-primary rounded-lg w-2/4 h-8 text-white font-bold font-nunito" onClick={props.onClick}>{props.value}</button>
    );
}