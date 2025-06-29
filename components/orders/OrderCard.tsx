import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { OrderInterface } from '@/types/order.interface';
import StatusLozenge, { getOrderStatusColor } from '@/components/StatusLozenge';
import { formatDate } from '@/utils/helpers/date.helper';

interface OrderCardProps {
    order: OrderInterface;
    onPress: (orderId: string) => void;
}

const OrderCard: React.FC<OrderCardProps> = ({ order, onPress }) => {
    return (
        <TouchableOpacity
            className="border border-neutral-30 rounded-xl p-4 mb-3 flex-row justify-between items-center shadow-sm shadow-neutral-30"
            onPress={() => onPress(order.uuid)}
        >
            <View className="flex-1">
                <Text className="text-lg font-semibold">{order.merchantReference}</Text>
                <Text>{order.currency + ' ' + order.grandTotal}</Text>
                <Text className="text-neutral-50">Date: {formatDate(order.createdAt)}</Text>
            </View>

            <View className="items-end">
                <StatusLozenge 
                    status={order.paymentStatus} 
                    type={getOrderStatusColor(order.paymentStatus)} 
                />
            </View>
        </TouchableOpacity>
    );
};

export default OrderCard;