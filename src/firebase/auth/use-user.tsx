
'use client';

import { useState, useEffect, createContext, useContext } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '@/firebase/config';
import { Loader2 } from 'lucide-react';

interface UserContextType {
    user: User | null;
    loading: boolean;
}

const UserContext = createContext<UserContextType>({ user: null, loading: true });

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    return (
        <UserContext.Provider value={{ user, loading }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};

export const AuthWrapper = ({ children, loadingComponent }: { children: React.ReactNode, loadingComponent?: React.ReactNode }) => {
    const { loading } = useUser();

    if (loading) {
        return loadingComponent || (
            <div className="flex h-screen w-full items-center justify-center">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
            </div>
        );
    }

    return <>{children}</>;
}
