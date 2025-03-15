// src/components/layout/routing/Routing.tsx
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../auth/auth/Auth';
import Login from '../../auth/login/Login';
import SignUp from '../../auth/sign-up/SignUp';
import Vacations from '../../vacations/vacations/Vacations';
import AddVacation from '../../vacations/add-vacation/AddVacation';
import EditVacation from '../../vacations/edit-vacation/EditVacation';
import NotFound from '../not-found/NotFound';

export default function Routing() {
    // Define the guard components inside Routing to avoid TypeScript issues with JSX

    // Authentication guard for regular users
    const AuthGuard = () => {
        const { isAuthenticated } = useContext(AuthContext)!;

        if (!isAuthenticated) {
            return <Navigate to="/login" replace />;
        }

        return <Outlet />;
    };

    // Role-based guard for admins
    const AdminGuard = () => {
        const { isAuthenticated, role } = useContext(AuthContext)!;

        if (!isAuthenticated) {
            return <Navigate to="/login" replace />;
        }

        if (role !== 'admin') {
            return <Navigate to="/vacations" replace />;
        }

        return <Outlet />;
    };

    // Get auth state for the login/signup redirects
    const { isAuthenticated } = useContext(AuthContext)!;

    return (
        <Routes>
            {/* Public routes - redirect if already logged in */}
            <Route path="/login" element={
                isAuthenticated ? <Navigate to="/vacations" /> : <Login />
            } />
            <Route path="/signup" element={
                isAuthenticated ? <Navigate to="/vacations" /> : <SignUp />
            } />

            {/* Default route */}
            <Route path="/" element={<Navigate to="/vacations" />} />

            {/* Protected routes - using nested routes with guards */}
            <Route element={<AuthGuard />}>
                {/* Regular user routes */}
                <Route path="/vacations" element={<Vacations />} />

                {/* Admin-only routes */}
                <Route element={<AdminGuard />}>
                    <Route path="/admin/add-vacation" element={<AddVacation />} />
                    <Route path="/admin/edit-vacation/:id" element={<EditVacation />} />
                </Route>
            </Route>

            {/* Catch-all route for 404 */}
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}