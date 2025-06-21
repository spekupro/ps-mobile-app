import React from 'react';
import { FlatList, Text } from 'react-native';
import { PaymentLink } from '@/types/payment-link.interface';
import PaymentLinkCard from './PaymentLinkCard';

interface PaymentLinksListProps {
    paymentLinks: PaymentLink[];
    onPaymentLinkPress: (paymentLinkId: string) => void;
}

const PaymentLinksList: React.FC<PaymentLinksListProps> = ({ paymentLinks, onPaymentLinkPress }) => {
    return (
        <FlatList
            className="px-6"
            data={paymentLinks}
            keyExtractor={(item) => item.uuid}
            ListEmptyComponent={<Text className="text-center text-gray-500">No payment links found</Text>}
            renderItem={({ item }) => (
                <PaymentLinkCard paymentLink={item} onPress={onPaymentLinkPress} />
            )}
        />
    );
};

export default PaymentLinksList;