// src/components/auth/auth/Auth.tsx
import { createContext, PropsWithChildren, useState, useMemo } from 'react';
import { jwtDecode } from 'jwt-decode';
import './Auth.css';
import User from '../../../models/user/User';

interface AuthContextInterface {
    jwt: string;
    user: User | null; // Complete user object, null means not authenticated
    isLoading: boolean;
    newLogin(jwt: string): void;
    logOut(): void;
}

export const AuthContext = createContext<AuthContextInterface | null>(null);

export default function Auth(props: PropsWithChildren): JSX.Element {
    const JWT_KEY_NAME = 'jwt';
    const { children } = props;

    const [jwt, setJwt] = useState<string>(localStorage.getItem(JWT_KEY_NAME) || '');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // Decode user with useMemo for performance
    const user = useMemo(() => {
        if (!jwt) return null;
        try {
            return jwtDecode<User>(jwt);
        } catch (error) {
            console.error("Invalid token:", error);

            // If token is invalid, clear it
            localStorage.removeItem(JWT_KEY_NAME);
            return null;
        }
    }, [jwt]);

    function newLogin(newJwt: string) {
        setIsLoading(true);
        localStorage.setItem(JWT_KEY_NAME, newJwt);
        setJwt(newJwt);
        setIsLoading(false);
    }

    function logOut() {
        setIsLoading(true);
        localStorage.removeItem(JWT_KEY_NAME);
        setJwt('');
        setIsLoading(false);
    }

    return (
        <AuthContext.Provider value={{
            jwt,
            user,
            isLoading,
            newLogin,
            logOut
        }}>
            {children}
        </AuthContext.Provider>
    );
}