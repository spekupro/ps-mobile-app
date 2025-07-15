import React from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import { router } from 'expo-router';
import { usePaymentLinks } from '@/hooks/usePaymentLinks';
import PaymentLinksList from '@/components/payment-links/PaymentLinksList';

const PaymentLinksScreen = () => {
    const { paymentLinks, loading, error } = usePaymentLinks();

    const handlePaymentLinkPress = (paymentLinkId: string) => {
        // Navigate to payment link details
        router.push(`/payment-link-detail?uuid=${paymentLinkId}`);
    };

    if (loading) {
        return (
            <SafeAreaView className="bg-white flex-1">
                <View className="flex-1 justify-center items-center">
                    <Text>Loading payment links...</Text>
                </View>
            </SafeAreaView>
        );
    }

    if (error) {
        return (
            <SafeAreaView className="bg-white flex-1">
                <View className="flex-1 justify-center items-center">
                    <Text className="text-red-500">Error: {error}</Text>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView className="bg-white flex-1">
            <View className="p-6">
                <Text className="text-3xl font-bold color-neutral-60">Payment Links</Text>
            </View>

            <PaymentLinksList
                paymentLinks={paymentLinks}
                onPaymentLinkPress={handlePaymentLinkPress}
            />
        </SafeAreaView>
    );
};

export default PaymentLinksScreen;