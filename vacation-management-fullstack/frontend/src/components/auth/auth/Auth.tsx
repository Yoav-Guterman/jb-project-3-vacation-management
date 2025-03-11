// src/components/auth/auth/Auth.tsx
import { createContext, PropsWithChildren, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import './Auth.css';
import User from '../../../models/user/User';

// Define what the AuthContext will provide to components
interface AuthContextInterface {
    jwt: string;
    isAuthenticated: boolean; // Clear flag for authentication status
    role: string;
    newLogin(jwt: string): void;
    logOut(): void;
}

// Create the context with null initial value
export const AuthContext = createContext<AuthContextInterface | null>(null);

export default function Auth(props: PropsWithChildren): JSX.Element {
    // Constants
    const JWT_KEY_NAME = 'jwt';
    const { children } = props;

    // State management
    const [jwt, setJwt] = useState<string>(localStorage.getItem(JWT_KEY_NAME) || '');
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [role, setRole] = useState<string>('');

    // Validate token whenever JWT changes
    useEffect(() => {
        // No token means not authenticated
        if (!jwt) {
            setIsAuthenticated(false);
            setRole('');
            return;
        }

        try {
            // Decode the token
            const decoded = jwtDecode<User>(jwt);

            // Check if token is expired
            const currentTime = Date.now() / 1000;
            if (decoded.exp && decoded.exp < currentTime) {
                // Token expired - log out the user
                console.log("Token expired, logging out...");
                logOut();
                return;
            }

            // Valid token - set authentication state
            setIsAuthenticated(true);
            setRole(decoded.role || '');
        } catch (error) {
            // Invalid token - log out the user
            console.error("Invalid token:", error);
            logOut();
        }
    }, [jwt]); // Only run when jwt changes

    // Login function
    function newLogin(newJwt: string) {
        localStorage.setItem(JWT_KEY_NAME, newJwt);
        setJwt(newJwt);
        // The useEffect above will handle validation and setting isAuthenticated/role
    }

    // Logout function
    function logOut() {
        localStorage.removeItem(JWT_KEY_NAME);
        setJwt('');
        setIsAuthenticated(false);
        setRole('');
    }

    // Provide auth context to all children components
    return (
        <AuthContext.Provider value={{
            jwt,
            isAuthenticated,
            role,
            newLogin,
            logOut
        }}>
            {children}
        </AuthContext.Provider>
    );
}