import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, TextInput, View, FlatList } from 'react-native';
import { useGlobalContext } from '@/context/GlobalProvider';
import apiClient from '@/services/api.client';
import CustomButton from '@/components/CustomButton';
import { OrderInterface } from '@/types/order.interface';

const OrdersScreen = () => {
    const { isLoading, setIsLoading } = useGlobalContext();
    const [orders, setOrders] = useState<OrderInterface[]>([]);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [error, setError] = useState('');

    const fetchOrders = async () => {
        try {
            setIsLoading(true);
            const response = await apiClient.get<OrderInterface[]>('/orders/?limit=10&offset=0&orderBy=createdAt&order=DESC');
            setOrders(response.data);
        } catch (err) {
            setError('Failed to fetch orders');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    // useEffect(() => {
    //     if (searchQuery.trim() === '') {
    //         setFilteredOrders(orders);
    //     } else {
    //         const filtered = orders.filter(order =>
    //             order.id.toString().includes(searchQuery),
    //         );
    //         setFilteredOrders(filtered);
    //     }
    // }, [searchQuery, orders]);

    return (
        <SafeAreaView className="bg-white flex-1">
            <View className="p-6">
                <Text className="text-3xl font-bold color-neutral-60 ">Orders</Text>

                <TextInput
                    className="border border-gray-300 rounded-md p-4 mt-6"
                    placeholder="Search by Order ID"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
            </View>

            <FlatList
                className="px-6"
                data={orders}
                keyExtractor={(item) => item.uuid.toString()}
                ListEmptyComponent={<Text className="text-center text-gray-500">No orders found</Text>}
                renderItem={({ item }) => (
                    <View className="border border-gray-200 rounded-md p-4 mb-2 bg-gray-50">
                        <Text className="text-lg font-semibold">Order ID: {item.merchantReference}</Text>
                        <Text>Amount: {item.grandTotal}€</Text>
                        <Text>Payment Method: {item.paymentMethodType}</Text>
                    </View>
                )}
            />
            <View className="px-6">
                <CustomButton
                    title="Refresh"
                    containerStyles="border-2 border-neutral-30 w-[120px] my-4"
                    textStyles="text-neutral-60"
                    handlePress={fetchOrders}
                    isLoading={isLoading}
                />
            </View>
        </SafeAreaView>
    );
};

export default OrdersScreen;