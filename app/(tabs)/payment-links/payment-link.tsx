import React from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { usePaymentLink } from '@/hooks/usePaymentLink';
import PaymentLinkHeader from '@/components/payment-links/PaymentLinkHeader';
import PaymentLinkDetails from '@/components/payment-links/PaymentLinkDetails';

const PaymentLinkScreen = () => {
    // In a real app, you'd get this UUID from route params
    const uuid = 'c767f871-2905-4bdd-ba12-32ff2d870ae3';
    const { paymentLink, loading, error } = usePaymentLink(uuid);

    if (loading) {
        return (
            <SafeAreaView className="bg-white flex-1">
                <View className="flex-1 justify-center items-center">
                    <Text>Loading...</Text>
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

    if (!paymentLink) {
        return (
            <SafeAreaView className="bg-white flex-1">
                <View className="flex-1 justify-center items-center">
                    <Text>Payment link not found</Text>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView className="bg-white flex-1">
            <PaymentLinkHeader uuid={paymentLink.uuid} />
            <KeyboardAwareScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                keyboardShouldPersistTaps="handled"
                enableOnAndroid={true}
            >
                <PaymentLinkDetails paymentLink={paymentLink} />
            </KeyboardAwareScrollView>
        </SafeAreaView>
    );
};

export default PaymentLinkScreen;