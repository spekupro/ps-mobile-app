import React from 'react';
import { FlatList, Text, View } from 'react-native';
import { OrderInterface } from '@/src/components/orders/interfaces/order.interface';
import OrderCard from './OrderCard';

interface OrdersListProps {
    orders: OrderInterface[];
    onOrderPress: (orderUuid: string) => void;
}

function OrdersList({ orders, onOrderPress }: OrdersListProps): React.JSX.Element {
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
            />
        </View>
    );
}

export default OrdersList;
