import React from 'react';
import { View, Text } from 'react-native';

interface PaymentLinkHeaderProps {
    uuid: string;
}

const PaymentLinkHeader: React.FC<PaymentLinkHeaderProps> = ({ uuid }) => {
    return (
        <View className="p-6">
            <Text className="text-3xl font-bold color-neutral-60">Payment Link</Text>
            <Text className="text-md color-neutral-50 mt-4">
                UUID: {uuid}
            </Text>
        </View>
    );
};

export default PaymentLinkHeader;