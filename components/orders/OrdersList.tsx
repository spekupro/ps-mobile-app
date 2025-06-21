import React from 'react';
import { FlatList, Text } from 'react-native';
import { OrderInterface } from '@/types/order.interface';
import OrderCard from './OrderCard';

interface OrdersListProps {
    orders: OrderInterface[];
    onOrderPress: (orderId: string) => void;
}

const OrdersList: React.FC<OrdersListProps> = ({ orders, onOrderPress }) => {
    return (
        <FlatList
            className="px-6"
            data={orders}
            keyExtractor={(item) => item.uuid.toString()}
            ListEmptyComponent={<Text className="text-center text-gray-500">No orders found</Text>}
            renderItem={({ item }) => (
                <OrderCard order={item} onPress={onOrderPress} />
            )}
        />
    );
};

export default OrdersList;