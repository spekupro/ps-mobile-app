import React, { useEffect } from 'react';
import { SafeAreaView, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useOrderDetail } from '@/hooks/useOrderDetail';
import { useGlobalContext } from '@/context/GlobalProvider';
import StatusLozenge, { getOrderStatusColor } from '@/components/StatusLozenge';
import { formatDate } from '@/utils/helpers/date.helper';
import icons from '@/constants/icons';
import { Image } from 'react-native';
import ChevronLeftIcon from '@/assets/icons/chevron-left.png';

const OrderDetailScreen = () => {
    const { uuid } = useLocalSearchParams<{ uuid: string }>();
    const router = useRouter();
    const { setIsLoading } = useGlobalContext();
    const { order, loading, error } = useOrderDetail(uuid || '');

    useEffect(() => {
        setIsLoading(loading);
    }, [loading, setIsLoading]);

    return (
        <SafeAreaView className="bg-white flex-1">
            <View className="flex-row items-center p-6 border-b border-neutral-20">
                <TouchableOpacity onPress={() => router.back()} className="mr-4">
                    <Image source={icons.ChevronLeftIcon} className="w-6 h-6" />
                </TouchableOpacity>
                <Text className="text-2xl font-bold color-neutral-60">Order Details</Text>
            </View>

            {error ? (
                <View className="flex-1 justify-center items-center">
                    <Text className="text-red-500">Error: {error}</Text>
                </View>
            ) : !order ? (
                <View className="flex-1 justify-center items-center">
                    <Text className="text-neutral-50">Loading...</Text>
                </View>
            ) : (
                <ScrollView className="flex-1 p-6">
                    <View className="bg-neutral-10 rounded-xl p-4 mb-6">
                        <View className="flex-row justify-between items-center mb-4">
                            <Text className="text-xl font-semibold">{order.merchantReference}</Text>
                            <StatusLozenge
                                status={order.paymentStatus}
                                type={getOrderStatusColor(order.paymentStatus)}
                            />
                        </View>

                        <View className="space-y-3">
                            <View className="flex-row justify-between">
                                <Text className="text-neutral-50">Order ID:</Text>
                                <Text className="font-medium">{order.uuid}</Text>
                            </View>

                            <View className="flex-row justify-between">
                                <Text className="text-neutral-50">Amount:</Text>
                                <Text className="font-medium text-lg">{order.currency} {order.grandTotal}</Text>
                            </View>

                            <View className="flex-row justify-between">
                                <Text className="text-neutral-50">Payment Method:</Text>
                                <Text className="font-medium">{order.paymentMethodType}</Text>
                            </View>

                            <View className="flex-row justify-between">
                                <Text className="text-neutral-50">Date Created:</Text>
                                <Text className="font-medium">{formatDate(order.createdAt)}</Text>
                            </View>

                            <View className="flex-row justify-between">
                                <Text className="text-neutral-50">Status:</Text>
                                <Text className="font-medium">{order.paymentStatus}</Text>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            )}
        </SafeAreaView>
    );
};

export default OrderDetailScreen;