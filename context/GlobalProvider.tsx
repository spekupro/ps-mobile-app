import React, { createContext, useContext, useState, useEffect } from 'react';

interface GlobalContextType {
    isLoggedIn: boolean;
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
    user: any;
    setUser: React.Dispatch<React.SetStateAction<any>>;
    isLoading: boolean;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const GlobalContext = createContext<GlobalContextType>({} as GlobalContextType);
export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }: React.ProviderProps<any>) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // TODO getCurrentUser / getCurrentSession
        setIsLoading(false);
        setIsLoggedIn(false);
    }, []);

    return (
        <GlobalContext.Provider value={{ isLoggedIn, setIsLoggedIn, user, setUser, isLoading, setIsLoading }}>
            {children}
        </GlobalContext.Provider>
    );
};

export default GlobalProvider;