import React from 'react';
import { FlatList, Text } from 'react-native';
import { OrderInterface } from '@/types/order.interface';
import OrderCard from './OrderCard';
import ScreenContainer from '@/components/ui/ScreenContainer';

interface OrdersListProps {
    orders: OrderInterface[];
    onOrderPress: (orderUuid: string) => void;
}

const OrdersList: React.FC<OrdersListProps> = ({ orders, onOrderPress }) => {
    return (
        <ScreenContainer>
            <FlatList
                data={orders}
                keyExtractor={(item) => item.uuid.toString()}
                ListEmptyComponent={<Text className="text-center text-gray-500">No orders found</Text>}
                renderItem={({ item }) => (
                    <OrderCard order={item} onPress={onOrderPress} />
                )}
            />
        </ScreenContainer>
    );
};

export default OrdersList;
