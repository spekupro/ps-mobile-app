import React from 'react';
import { Redirect } from 'expo-router';
import { useGlobalContext } from '@/src/context/GlobalProvider';
import { ActivityIndicator, View } from 'react-native';

function App() {
    const { isLoggedIn, isLoading } = useGlobalContext();

    // Show loading spinner while checking session
    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#5C14EB" />
            </View>
        );
    }

    if (isLoggedIn) {
        return <Redirect href={'/orders'} />;
    }

    return <Redirect href={'/(auth)/login'} />;
}

export default App;
