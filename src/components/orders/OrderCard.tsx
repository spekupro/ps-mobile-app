import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { OrderInterface } from '@/src/components/orders/interfaces/order.interface';
import StatusLozenge, { getOrderStatusColor } from '@/src/components/StatusLozenge';
import { formatDate } from '@/src/common/helpers/date.helper';

interface OrderCardProps {
    order: OrderInterface;
    onPress: (orderUuid: string) => void;
}

function OrderCard({ order, onPress }: OrderCardProps): React.JSX.Element {
    return (
        // <TouchableOpacity
        //     className="border border-neutral-30 rounded-xl p-4 mb-3 flex-row justify-between items-center"
        //     onPress={() => onPress(order.uuid)}
        // >
        //     <View className="flex-1">
        //         <Text className="text-lg font-semibold" style={{ lineHeight: 18 }}>{order.merchantReference}</Text>
        //         <Text>{order.currency + ' ' + order.grandTotal}</Text>
        //         <Text className="text-neutral-50">{formatDate(order.createdAt)}</Text>
        //     </View>
        //
        //     <View className="items-end">
        //         <StatusLozenge
        //             status={order.paymentStatus}
        //             type={getOrderStatusColor(order.paymentStatus)}
        //         />
        //     </View>
        // </TouchableOpacity>
        <TouchableOpacity
            className="border border-neutral-30 rounded-xl p-4 mb-3 flex-row justify-between items-center"
            onPress={() => onPress(order.uuid)}
        >
            <View className="flex-1">
                <Text className="text-neutral-40">{formatDate(order.createdAt)}</Text>
                <Text className="font-medium">{order.merchantReference}</Text>
            </View>

            <View className="flex-col items-end pl-6">
                <Text className="font-medium">{order.currency + ' ' + order.grandTotal}</Text>
                <StatusLozenge
                    status={order.paymentStatus}
                    type={getOrderStatusColor(order.paymentStatus)}
                />
            </View>
        </TouchableOpacity>
    );
}

export default OrderCard;
