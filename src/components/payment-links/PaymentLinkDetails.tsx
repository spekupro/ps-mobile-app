import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { PaymentLink } from '@/src/components/payment-links/interfaces/payment-link.interface';
import StatusLozenge, { getOrderStatusColor } from '@/src/components/StatusLozenge';
import PaymentLinkField from '@/src/components/ui/PaymentLinkField';
import Card from '@/src/components/ui/Card';

interface PaymentLinkDetailsProps {
    paymentLink: PaymentLink;
}

const PaymentLinkDetails: React.FC<PaymentLinkDetailsProps> = ({ paymentLink }) => {
    return (
        <Card>
            <View className="flex-row items-center justify-between">
                <Text className="text-lg font-semibold">Details</Text>
                <View className="items-end">
                    <StatusLozenge
                        status={paymentLink.status}
                        type={getOrderStatusColor(paymentLink.status)}
                    />
                </View>
            </View>

            <View
                style={{
                    padding: 10,
                    borderBottomColor: 'gray',
                    borderBottomWidth: StyleSheet.hairlineWidth,
                }}
            />

            <View className="pt-4">
                <PaymentLinkField
                    label="Description:"
                    value={paymentLink.description}
                />
                <PaymentLinkField
                    label="Amount"
                    value={`€${paymentLink.amount.toFixed(2)}`}
                />
                <PaymentLinkField
                    label="Created At"
                    value={paymentLink.createdAt}
                />
                <PaymentLinkField
                    label="Expired at"
                    value={paymentLink.expiresAt}
                />
                <PaymentLinkField
                    label="Link"
                    value={paymentLink.url}
                    isLink={true}
                    href={paymentLink.url}
                />

                {/* TODO: Replace with proper QR code generation */}
                {/* <View className="flex-row items-center justify-center py-5">
                    <Image
                        source={images.QRCode}
                        className="items-center align-middle w-150 h-150"
                    />
                </View> */}
            </View>
        </Card>
    );
};

export default PaymentLinkDetails;
