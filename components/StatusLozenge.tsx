import React from 'react';
import { Text, View } from 'react-native';
import { OrderPaymentStatusEnum } from '@/utils/enums/order-payment-status.enum';

interface StatusLozengeProps {
    status: OrderPaymentStatusEnum;
    type: 'main' | 'neutral' | 'info' | 'success' | 'warning' | 'error';
}

export const getOrderStatusColor = (status: OrderPaymentStatusEnum): 'main' | 'neutral' | 'info' | 'success' | 'warning' | 'error' => {
    switch (status) {
        case OrderPaymentStatusEnum.PENDING:
        case OrderPaymentStatusEnum.AUTHORIZED:
        case OrderPaymentStatusEnum.AWAITING_SETTLEMENT:
            return 'warning';

        case OrderPaymentStatusEnum.PARTIALLY_PAID:
        case OrderPaymentStatusEnum.PAID:
            return 'success';

        case OrderPaymentStatusEnum.VOIDED:
            return 'error';

        case OrderPaymentStatusEnum.PARTIALLY_REFUNDED:
        case OrderPaymentStatusEnum.REFUNDED:
        default:
            return 'neutral';
    }
};

const statusColors: Record<string, string> = {
    warning: 'text-warning-60 bg-warning-10',
    success: 'text-success-60 bg-success-10',
    error: 'text-error-60 bg-error-10',
    neutral: 'text-neutral-60 bg-neutral-10',
};

const StatusLozenge: React.FC<StatusLozengeProps> = ({ status, type }) => {
    const colors = statusColors[type];

    return (
        <View className={`items-start`}>
            <Text
                className={`text-xs p-1.5 rounded-xl shadow-sm shadow-neutral-20 ${colors}`}>
                {status}
            </Text>
        </View>
    );
};

export default StatusLozenge;
