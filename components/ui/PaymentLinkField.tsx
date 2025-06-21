import React from 'react';
import { View, Text } from 'react-native';
import { Link } from 'expo-router';
import { PaymentLinkFieldProps } from '@/types/payment-link.interface';

const PaymentLinkField: React.FC<PaymentLinkFieldProps> = ({ label, value, isLink = false, href }) => {
    return (
        <View className="flex-row items-center justify-between py-2">
            <View className="w-1/2">
                <Text>{label}</Text>
            </View>
            <View className="w-1/2">
                {isLink && href ? (
                    <Link href={{ pathname: href }} className="text-primary">
                        {value}
                    </Link>
                ) : (
                    <Text>{value}</Text>
                )}
            </View>
        </View>
    );
};

export default PaymentLinkField;