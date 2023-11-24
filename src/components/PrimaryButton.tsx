interface ButtonProps {
    value: string;
}

export default function PrimaryButton (props: ButtonProps) {
    return (
        <button className="bg-primary rounded-lg w-2/4 h-8 text-white font-bold font-nunito">{props.value}</button>
    );
}