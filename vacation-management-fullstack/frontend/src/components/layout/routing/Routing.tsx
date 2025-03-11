import { Navigate, Route, Routes } from "react-router-dom";
import NotFound from "../not-found/NotFound";
import SignUp from "../../auth/sign-up/SignUp";
import { useContext } from "react";
import { AuthContext } from "../../auth/auth/Auth";
import Login from "../../auth/login/Login";
import Vacations from "../../vacations/vacations/Vacations";



export default function Routing(): JSX.Element {

    const { jwt } = useContext(AuthContext)!
    const isLoggedIn = !!jwt

    return (
        <Routes>
            {/* Public routes - always accessible */}
            <Route path="/login" element={
                // If already logged in, redirect to profile
                isLoggedIn ? <Navigate to="/vacations" /> : <Login />
            } />
            <Route path="/signUp" element={
                isLoggedIn ? <Navigate to="/vacations" /> : <SignUp />
            } />

            {/* Protected routes - only accessible when logged in */}
            <Route path="/" element={
                isLoggedIn ? <Navigate to="/vacations" /> : <Navigate to="/login" />
            } />

            <Route path="/vacations" element={
                isLoggedIn ? <Vacations /> : <Navigate to="/login" />
            } />

            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}