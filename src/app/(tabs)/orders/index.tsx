import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useGlobalContext } from '@/src/context/GlobalProvider';
import { useOrders } from '@/src/components/orders/hooks/useOrders';
import { OrderInterface } from '@/src/components/orders/interfaces/order.interface';
import OrdersHeader from '@/src/components/orders/OrdersHeader';
import OrdersList from '@/src/components/orders/OrdersList';
import { SafeAreaView } from 'react-native-safe-area-context';

const OrdersScreen = () => {
    const router = useRouter();
    const { setIsLoading } = useGlobalContext();
    const { orders, loading, error, refetch } = useOrders();
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredOrders, setFilteredOrders] = useState<OrderInterface[]>([]);

    useEffect(() => {
        setIsLoading(loading);
    }, [loading, setIsLoading]);

    useEffect(() => {
        if (searchQuery.trim() === '') {
            setFilteredOrders(orders);
        } else {
            const filtered = orders.filter(order =>
                order.merchantReference.toLowerCase().includes(searchQuery.toLowerCase()) ||
                order.uuid.toLowerCase().includes(searchQuery.toLowerCase()),
            );
            setFilteredOrders(filtered);
        }
    }, [searchQuery, orders]);

    const handleOrderPress = (orderUuid: string) => {
        router.push(`/orders/${orderUuid}/details`);
    };

    return (
        <SafeAreaView className="bg-white flex-1" edges={['top']}>
            <OrdersHeader
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                onRefresh={refetch}
            />

            {error ? (
                    <View className="flex-1 justify-center items-center">
                        <Text className="text-red-500">Error: {error}</Text>
                    </View>
                ) :
                <OrdersList
                    orders={filteredOrders}
                    onOrderPress={handleOrderPress}
                />
            }
        </SafeAreaView>
    );
};

export default OrdersScreen;
