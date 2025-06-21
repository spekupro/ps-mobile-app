import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { PaymentLink } from '@/types/payment-link.interface';
import StatusLozenge, { getOrderStatusColor } from '@/components/StatusLozenge';

interface PaymentLinkCardProps {
    paymentLink: PaymentLink;
    onPress: (paymentLinkId: string) => void;
}

const PaymentLinkCard: React.FC<PaymentLinkCardProps> = ({ paymentLink, onPress }) => {
    return (
        <TouchableOpacity
            className="border border-neutral-30 rounded-xl p-4 mb-3 flex-row justify-between items-center shadow-sm shadow-neutral-30"
            onPress={() => onPress(paymentLink.uuid)}
        >
            <View className="flex-1">
                <Text className="text-lg font-semibold">{paymentLink.description}</Text>
                <Text>€{paymentLink.amount.toFixed(2)}</Text>
                <Text className="text-neutral-50">Created: {paymentLink.createdAt}</Text>
            </View>

            <View className="items-end">
                <StatusLozenge 
                    status={paymentLink.status} 
                    type={getOrderStatusColor(paymentLink.status)} 
                />
            </View>
        </TouchableOpacity>
    );
};

export default PaymentLinkCard;