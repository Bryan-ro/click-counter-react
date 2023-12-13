import React, { ChangeEventHandler } from "react";
import InputMask from "react-input-mask";

interface InputProps {
    type: React.HTMLInputTypeAttribute;
    placeholder: string;
    id: string;
    onChange?: ChangeEventHandler<HTMLInputElement>;
    required?: boolean
    mask?: string;
    maxLength?: number;
}

export default function Input(props: InputProps) {
    return (
        <InputMask type={props.type} placeholder={props.placeholder} className="rounded-md focus:outline-none border indent-2 h-10" id={props.id} onChange={props.onChange} required={props.required} mask={props.mask ?? ""} maskChar={null} maxLength={props.maxLength} />
    );
}