import React from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import { OrderInterface } from '@/src/components/orders/interfaces/order.interface';
import OrderCard from './OrderCard';

interface OrdersListProps {
    orders: OrderInterface[];
    onOrderPress: (orderUuid: string) => void;
    onEndReached?: () => void;
    isLoadingMore?: boolean;
}

function OrdersList({ orders, onOrderPress, onEndReached, isLoadingMore }: OrdersListProps): React.JSX.Element {
    const renderFooter = () => {
        if (!isLoadingMore) return null;
        return (
            <View className="py-4">
                <ActivityIndicator size="small" color="#5C14EB" />
            </View>
        );
    };

    return (
        <View className="flex-1">
            <FlatList
                className="px-6 pt-6"
                data={orders}
                keyExtractor={(item) => item.uuid.toString()}
                ListEmptyComponent={<Text className="text-center text-gray-500">No orders found</Text>}
                renderItem={({ item }) => (
                    <OrderCard order={item} onPress={onOrderPress} />
                )}
                onEndReached={onEndReached}
                onEndReachedThreshold={0.5}
                ListFooterComponent={renderFooter}
            />
        </View>
    );
}

export default OrdersList;
