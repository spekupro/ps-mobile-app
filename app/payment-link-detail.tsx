import React, { useEffect } from 'react';
import { SafeAreaView, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { usePaymentLink } from '@/hooks/usePaymentLink';
import { useGlobalContext } from '@/context/GlobalProvider';
import PaymentLinkHeader from '@/components/payment-links/PaymentLinkHeader';
import PaymentLinkDetails from '@/components/payment-links/PaymentLinkDetails';
import icons from '@/constants/icons';
import { Image } from 'react-native';

const PaymentLinkDetailScreen = () => {
    const { uuid } = useLocalSearchParams<{ uuid: string }>();
    const router = useRouter();
    const { setIsLoading } = useGlobalContext();
    const { paymentLink, loading, error } = usePaymentLink(uuid || '');

    useEffect(() => {
        setIsLoading(loading);
    }, [loading, setIsLoading]);

    return (
        <SafeAreaView className="bg-white flex-1">
            <View className="flex-row items-center p-6 border-b border-neutral-20">
                <TouchableOpacity onPress={() => router.back()} className="mr-4">
                    <Image source={icons.ChevronLeftIcon} className="w-6 h-6" />
                </TouchableOpacity>
                <Text className="text-2xl font-bold color-neutral-60">Payment Link Details</Text>
            </View>

            {error ? (
                <View className="flex-1 justify-center items-center">
                    <Text className="text-red-500">Error: {error}</Text>
                </View>
            ) : !paymentLink ? (
                <View className="flex-1 justify-center items-center">
                    <Text className="text-neutral-50">Loading...</Text>
                </View>
            ) : (
                <ScrollView className="flex-1">
                    <PaymentLinkHeader uuid={paymentLink.uuid} />
                    <PaymentLinkDetails paymentLink={paymentLink} />
                </ScrollView>
            )}
        </SafeAreaView>
    );
};

export default PaymentLinkDetailScreen;