export default function Loading() {
    return (
        <div className="absolute w-screen h-screen bg-zinc-600/50 flex justify-center items-center z-50">
            <div className="border-r-8 border-l-8 border-r-primary w-14 h-14 rounded-full animate-spin"></div>
        </div>
    );
}