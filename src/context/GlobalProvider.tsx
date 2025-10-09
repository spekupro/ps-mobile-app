import React, { createContext, useContext, useEffect, useState } from 'react';
import { UserProfile } from '@/src/components/auth/services/auth.service';

interface GlobalContextType {
    isLoggedIn: boolean;
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
    user: UserProfile | null;
    setUser: React.Dispatch<React.SetStateAction<UserProfile | null>>;
    isLoading: boolean;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
    currentStoreUuid: string | null;
    setCurrentStoreUuid: React.Dispatch<React.SetStateAction<string | null>>;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const useGlobalContext = () => {
    const context = useContext(GlobalContext);

    if (!context) {
        throw new Error('useGlobalContext must be used within a GlobalProvider');
    }

    return context;
};

const GlobalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState<UserProfile | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [currentStoreUuid, setCurrentStoreUuid] = useState<string | null>(null);

    useEffect(() => {
        // Check if user has valid session on app start
        const checkSession = async () => {
            try {
                setIsLoading(true);
                const AuthService = (await import('@/src/components/auth/services/auth.service')).default;
                const profile = await AuthService.getProfile();

                // If profile fetch succeeds, user is logged in
                setUser(profile);
                setIsLoggedIn(true);
            } catch (error) {
                // If profile fetch fails, user is not logged in
                console.log('No active session');
                setIsLoggedIn(false);
            } finally {
                setIsLoading(false);
            }
        };

        checkSession();
    }, []);

    // Auto-select first available store when user is set
    useEffect(() => {
        if (user && !currentStoreUuid) {
            const firstStore = user.store?.uuid || user.business?.stores?.[0]?.uuid || null;
            setCurrentStoreUuid(firstStore);
        }
    }, [user, currentStoreUuid]);

    return (
        <GlobalContext.Provider
            value={{
                isLoggedIn,
                setIsLoggedIn,
                user,
                setUser,
                isLoading,
                setIsLoading,
                currentStoreUuid,
                setCurrentStoreUuid,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};

export default GlobalProvider;
