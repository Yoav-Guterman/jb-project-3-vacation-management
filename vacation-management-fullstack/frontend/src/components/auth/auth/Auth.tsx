// src/components/auth/auth/Auth.tsx
import { createContext, PropsWithChildren, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import './Auth.css';
import User from '../../../models/user/User';

// Define what the AuthContext will provide to components
interface AuthContextInterface {
    jwt: string;
    isAuthenticated: boolean;
    role: string;
    isLoading: boolean; // Added isLoading state
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
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        // No token means not authenticated
        if (jwt) {
            try {
                // Decode the token
                const decoded = jwtDecode<User>(jwt);
                setIsAuthenticated(true);
                setRole(decoded.role);
            } catch (error) {
                console.error("Invalid token:", error);
                logOut();
            }
        }
        setIsLoading(false);
    }, [jwt]);

    // Login function
    function newLogin(newJwt: string) {
        setIsLoading(true); // Done loading
        localStorage.setItem(JWT_KEY_NAME, newJwt);
        setJwt(newJwt);
        setIsLoading(false); // Done loading
    }

    // Logout function
    function logOut() {
        setIsLoading(true)
        localStorage.removeItem(JWT_KEY_NAME);
        setJwt('');
        setIsAuthenticated(false);
        setRole('');
        setIsLoading(false); // Done loading
    }

    // Provide auth context to all children components
    return (
        <AuthContext.Provider value={{
            jwt,
            isAuthenticated,
            role,
            isLoading, // Add isLoading to the context
            newLogin,
            logOut
        }}>
            {children}
        </AuthContext.Provider>
    );
}