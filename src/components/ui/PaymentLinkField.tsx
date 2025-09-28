import React from 'react';
import { View, Text, Linking, TouchableOpacity } from 'react-native';
import { PaymentLinkFieldProps } from '@/src/components/payment-links/interfaces/payment-link.interface';

const PaymentLinkField: React.FC<PaymentLinkFieldProps> = ({ label, value, isLink = false, href }) => {
    return (
        <View className="flex-row items-center justify-between py-2">
            <View className="w-1/2">
                <Text>{label}</Text>
            </View>
            <View className="w-1/2">
                {isLink && href ? (
                    <TouchableOpacity onPress={() => Linking.openURL(href)}>
                        <Text className="text-primary">
                            {value}
                        </Text>
                    </TouchableOpacity>
                ) : (
                    <Text>{value}</Text>
                )}
            </View>
        </View>
    );
};

export default PaymentLinkField;
