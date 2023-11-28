import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import CreateAccount from "./pages/createAccount/CreateAccount";

export default function Router() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/account/create" element={<CreateAccount />} />
        </Routes>
    );
}