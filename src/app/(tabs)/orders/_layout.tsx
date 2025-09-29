import { Stack } from 'expo-router';

const OrdersLayout = () => {
    return (
        <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="[uuid]/details" options={{ headerShown: false }} />
        </Stack>
    );
};

export default OrdersLayout;