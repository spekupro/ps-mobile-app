import { Stack } from 'expo-router';
import '../../global.css';
import GlobalProvider from '@/src/context/GlobalProvider';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

const RootLayout = () => {
    return (
        <SafeAreaProvider>
            <GlobalProvider>
                <Stack>
                    <Stack.Screen name="index" options={{ headerShown: false }} />
                    <Stack.Screen name="(auth)" options={{ headerShown: false }} />
                    <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                </Stack>
            </GlobalProvider>
            <StatusBar style="dark" />
        </SafeAreaProvider>
    );
};

export default RootLayout;
