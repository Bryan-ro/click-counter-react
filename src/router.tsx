import  { Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";

export default function Router () {
    return (
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/login" element={<Login/>} />
        </Routes>
    );
}