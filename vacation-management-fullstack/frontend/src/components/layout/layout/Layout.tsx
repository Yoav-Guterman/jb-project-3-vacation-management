// src/components/layout/layout/Layout.tsx
import { useContext } from 'react';
import { AuthContext } from '../../auth/auth/Auth';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import Routing from '../routing/Routing';
import './Layout.css';

export default function Layout() {
    const { isAuthenticated } = useContext(AuthContext)!;

    return (
        <div className='Layout'>
            {isAuthenticated ? (
                <>
                    <header>
                        <Header />
                    </header>
                    <main>
                        <Routing />
                    </main>
                    <footer>
                        <Footer />
                    </footer>
                </>
            ) : (
                <div className="auth-main">
                    <Routing />
                </div>
            )}
        </div>
    );
}