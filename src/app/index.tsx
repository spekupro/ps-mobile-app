import React from 'react';
import { Redirect } from 'expo-router';
import { useGlobalContext } from '@/src/context/GlobalProvider';

const App = () => {
    const { isLoggedIn } = useGlobalContext();

    if (isLoggedIn) {
        return <Redirect href={'/orders/orders'} />;
    }

    return <Redirect href={'/(auth)/login'} />;
};

export default App;
