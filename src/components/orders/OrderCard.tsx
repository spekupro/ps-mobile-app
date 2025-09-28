import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { OrderInterface } from '@/src/components/orders/interfaces/order.interface';
import StatusLozenge, { getOrderStatusColor } from '@/src/components/StatusLozenge';
import { formatDate } from '@/src/common/helpers/date.helper';

interface OrderCardProps {
    order: OrderInterface;
    onPress: (orderUuid: string) => void;
}

const OrderCard: React.FC<OrderCardProps> = ({ order, onPress }) => {
    return (
        <TouchableOpacity
            className="border border-neutral-30 rounded-xl p-4 mb-3 flex-row justify-between items-center"
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
