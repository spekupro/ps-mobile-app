import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { PaymentLink } from '@/types/payment-link.interface';
import StatusLozenge, { getOrderStatusColor } from '@/components/StatusLozenge';
import PaymentLinkField from '@/components/ui/PaymentLinkField';
import Card from '@/components/ui/Card';
import images from '@/constants/images';

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
                
                <View className="flex-row items-center justify-center py-5">
                    <Image
                        source={images.QRCode}
                        className="items-center align-middle w-150 h-150"
                    />
                </View>
            </View>
        </Card>
    );
};

export default PaymentLinkDetails;