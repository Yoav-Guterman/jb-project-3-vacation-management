// src/components/layout/routing/Routing.tsx
import { Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../auth/auth/Auth';
import Login from '../../auth/login/Login';
import SignUp from '../../auth/sign-up/SignUp';
import Vacations from '../../vacations/vacations/Vacations';
import AddVacation from '../../vacations/add-vacation/AddVacation';
import EditVacation from '../../vacations/edit-vacation/EditVacation';
import NotFound from '../not-found/NotFound';

export default function Routing() {
    const { isAuthenticated, role, isLoading } = useContext(AuthContext)!;
    const isAdmin = role === 'admin';

    // Show loading indicator while authentication state is loading
    if (isLoading) {
        return (
            <div className="loading-container">
                <p>Loading...</p>
            </div>
        );
    }

    return (
        <Routes>
            {/* Public routes */}
            <Route path="/login" element={isAuthenticated ? <Navigate to="/vacations" /> : <Login />} />
            <Route path="/signup" element={isAuthenticated ? <Navigate to="/vacations" /> : <SignUp />} />

            {/* Default route */}
            <Route path="/" element={<Navigate to="/vacations" />} />

            {/* User route - protected */}
            <Route
                path="/vacations"
                element={isAuthenticated ? <Vacations /> : <Navigate to="/login" />}
            />

            {/* Admin routes - protected */}
            <Route
                path="/admin/add-vacation"
                element={
                    isAuthenticated
                        ? (isAdmin ? <AddVacation /> : <Navigate to="/vacations" />)
                        : <Navigate to="/login" />
                }
            />

            <Route
                path="/admin/edit-vacation/:id"
                element={
                    isAuthenticated
                        ? (isAdmin ? <EditVacation /> : <Navigate to="/vacations" />)
                        : <Navigate to="/login" />
                }
            />

            {/* Catch-all route for 404 */}
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}