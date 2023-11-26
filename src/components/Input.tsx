import React, { ChangeEventHandler } from "react";

interface InputProps {
    type: React.HTMLInputTypeAttribute;
    placeholder: string;
    id: string;
    onChange?: ChangeEventHandler<HTMLInputElement>;
    required?: boolean
}

export default function Input (props: InputProps) {
    return (
        <input type={props.type} placeholder={props.placeholder} className="rounded-md focus:outline-none border indent-2 h-10" id={props.id} onChange={props.onChange} required={props.required}/>
    );
}