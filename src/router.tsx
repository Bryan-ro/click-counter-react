import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import CreateAccount from "./pages/createAccount/CreateAccount";
import Dashboard from "./pages/dashboard/Dashboard";
import useLogin from "./hooks/useLogin";

export default function Router() {
    const { login } = useLogin();

    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/login" element={!login ? <Login /> : <Navigate to="/" replace={true} />} />
            <Route path="/account/create" element={!login ? <CreateAccount /> : <Navigate to="/" replace={true} />} />
        </Routes>
    );
}