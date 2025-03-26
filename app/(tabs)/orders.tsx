import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, View, FlatList, TouchableOpacity, Pressable } from 'react-native';
import { useGlobalContext } from '@/context/GlobalProvider';
import apiClient from '@/services/api.client';
import { OrderInterface } from '@/types/order.interface';
import StatusLozenge, { getOrderStatusColor } from '@/components/StatusLozenge';
import { formatDate } from '@/utils/helpers/date.helper';
import icons from '@/constants/icons';
import CustomTextInput from '@/components/CustomTextInput';

const OrdersScreen = () => {
    const { isLoading, setIsLoading } = useGlobalContext();
    const [orders, setOrders] = useState<OrderInterface[]>([]);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [error, setError] = useState('');

    const fetchOrders = async () => {
        try {
            setIsLoading(true);
            const response = await apiClient.get<OrderInterface[]>('stargate/orders/?limit=10&offset=0&orderBy=createdAt&order=DESC');
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

                <CustomTextInput
                    placeholder="Search by Order ID"
                    value={searchQuery}
                    image={icons.SearchIcon}
                    handleChangeText={setSearchQuery}
                />
            </View>

            <FlatList
                className="px-6"
                data={orders}
                keyExtractor={(item) => item.uuid.toString()}
                ListEmptyComponent={<Text className="text-center text-gray-500">No orders found</Text>}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        className="border border-neutral-30 rounded-xl p-4 mb-3 flex-row justify-between items-center shadow-sm shadow-neutral-30"
                        onPress={() => console.log('Navigate to order details', item.uuid)}
                    >
                        <View className="flex-1">
                            <Text className="text-lg font-semibold">Order ID: {item.merchantReference}</Text>
                            <Text>Amount: {item.currency + ' ' + item.grandTotal}</Text>
                            <Text>Method: {item.paymentMethodType}</Text>
                            <Text className={'text-neutral-50'}>Date: {formatDate(item.createdAt)}</Text>
                        </View>

                        <View className="items-end">
                            <StatusLozenge status={item.paymentStatus} type={getOrderStatusColor(item.paymentStatus)} />
                        </View>
                    </TouchableOpacity>
                )}
            />
        </SafeAreaView>
    );
};

export default OrdersScreen;