import { InputHTMLAttributes } from "react";

export default function Input (props: InputHTMLAttributes<HTMLInputElement>) {
    return (
        <input type={props.type} placeholder={props.placeholder} className="rounded-md focus:outline-none border indent-2 h-10" id={props.id} />
    );
}