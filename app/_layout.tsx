import { Stack } from 'expo-router';
import '../global.css';
import GlobalProvider from '@/context/GlobalProvider';

const RootLayout = () => {
    return (
        <GlobalProvider>
            <Stack>
                <Stack.Screen name="index" options={{ headerShown: false }} />
                <Stack.Screen name="(auth)" options={{ headerShown: false }} />
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen name="order-detail" options={{ headerShown: false }} />
                <Stack.Screen name="payment-link-detail" options={{ headerShown: false }} />
                <Stack.Screen name="create-payment-link" options={{ headerShown: false }} />
            </Stack>
        </GlobalProvider>
    );
};

export default RootLayout;
