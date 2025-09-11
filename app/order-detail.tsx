import React, { useEffect } from 'react';
import { Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useOrderDetail } from '@/hooks/useOrderDetail';
import { useGlobalContext } from '@/context/GlobalProvider';
import StatusLozenge, { getOrderStatusColor } from '@/components/StatusLozenge';
import Card from '@/components/ui/Card';
import { formatDate } from '@/utils/helpers/date.helper';
import icons from '@/constants/icons';
import { Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

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
                <Text className="text-xl font-bold color-neutral-60">Order Details</Text>
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
                <ScrollView className="flex-1">
                    <View className="mb-6 p-6 border-b border-neutral-20">
                        <Text
                            className="text-2xl font-bold text-neutral-80 mb-1">{order.merchantReference}</Text>
                        <Text className="text-neutral-40 text-sm mb-2">UUID: {order.uuid}</Text>
                        <StatusLozenge
                            status={order.paymentStatus}
                            type={getOrderStatusColor(order.paymentStatus)}
                        />
                    </View>

                    {/* Order Details Card */}
                    <Card header="Details" className={`p-4`}>
                        <View className="flex-row flex-start h-6">
                            <Text className="w-1/2">Order ID</Text>
                            <Text className="font-medium w-1/2">{order.merchantReference}</Text>
                        </View>

                        <View className="flex-row justify-between h-6">
                            <Text className="w-1/2">Business legal name</Text>
                            <Text className="font-medium w-1/2">{order.businessName}</Text>
                        </View>

                        <View className="flex-row justify-between h-6">
                            <Text className="w-1/2">Store name</Text>
                            <Text className="font-medium w-1/2">{order.storeName}</Text>
                        </View>
                    </Card>

                    {/* Customer Card */}
                    <Card header="Customer" className={`p-4`}>
                        <View className="flex-row flex-start h-6">
                            <Text className="w-1/2">Name</Text>
                            <Text
                                className="font-medium w-1/2">{order.billingAddress?.firstName} {order.billingAddress?.lastName}</Text>
                        </View>

                        <View className="flex-row flex-start h-6">
                            <Text className="w-1/2">Phone</Text>
                            <Text className="font-medium w-1/2">{order.billingAddress?.phoneNumber || '-'}</Text>
                        </View>

                        <View className="flex-row flex-start h-6">
                            <Text className="w-1/2">Email</Text>
                            <Text className="font-medium w-1/2">{order.billingAddress?.email || '-'}</Text>
                        </View>
                    </Card>

                    {/* Items Card */}
                    <Card header="Items">
                        {/* Table Header */}
                        <View className="bg-neutral-10 p-4">
                            <View className="flex-row justify-between">
                                <Text className="font-medium flex-1">Name</Text>
                                <Text className="font-medium w-20 text-center">Quantity</Text>
                                <Text className="font-medium w-20 text-right">Price</Text>
                            </View>
                        </View>

                        {order.lineItems ?
                            order.lineItems.map((item: any, index: number) => (
                                <View key={index}
                                      className="flex-row justify-between px-4 py-6 border-b border-neutral-20 ">
                                    <Text className="flex-1">{item.name}</Text>
                                    <Text className="w-20 text-center">{item.quantity}</Text>
                                    <Text className="w-20 text-right">€{item.finalPrice}</Text>
                                </View>
                            ))
                            : ''}

                        {/* Total */}
                        <View className="p-4">
                            <View className="flex-row justify-between">
                                <Text className="font-bold text-lg">Total</Text>
                                <Text className="font-bold text-lg">€{order.grandTotal}</Text>
                            </View>
                        </View>
                    </Card>

                    {/* Payments Card */}
                    <Card header="Payments">
                        {/* Table Header */}
                        <View className="bg-neutral-10 p-4">
                            <View className="flex-row justify-between">
                                <Text className="font-medium flex-1">Date</Text>
                                <Text className="font-medium flex-1">Payment method</Text>
                                <Text className="font-medium w-20">Amount</Text>
                                <Text className="font-medium w-20">Status</Text>
                            </View>
                        </View>

                        {order.paymentIntents?.map((intent: any, index: number) => (
                            <View key={index} className="flex-row justify-between items-center p-4">
                                <View className="flex-1">
                                    <Text className="font-medium">{formatDate(intent.createdAt)}</Text>
                                </View>
                                <View className="flex-1">
                                    <Text>Payment Initiation</Text>
                                </View>
                                <View className="w-20">
                                    <Text>€{intent.amount}</Text>
                                </View>
                                <View className="w-20">
                                    <StatusLozenge
                                        status={intent.status}
                                        type={getOrderStatusColor(intent.status)}
                                    />
                                </View>
                            </View>
                        ))}
                    </Card>

                    {/* Refunds Card */}
                    <Card header="Refunds">
                        {/* Table Header */}
                        <View className="bg-neutral-10 p-4">
                            <View className="flex-row justify-between">
                                <Text className="font-medium flex-1">Date</Text>
                                <Text className="font-medium flex-1">Refund type</Text>
                                <Text className="font-medium w-20">Amount</Text>
                                <Text className="font-medium w-20">Status</Text>
                            </View>
                        </View>

                        {order.refunds?.length > 0 ? (
                            order.refunds.map((refund: any, index: number) => (
                                <View key={index} className="flex-row justify-between items-center p-4">
                                    <View className="flex-1">
                                        <Text className="font-medium">{formatDate(refund.createdAt)}</Text>
                                    </View>
                                    <View className="flex-1">
                                        <Text>{refund.type}</Text>
                                    </View>
                                    <View className="w-20">
                                        <Text>€{refund.amount}</Text>
                                    </View>
                                    <View className="w-20">
                                        <StatusLozenge
                                            status={refund.status}
                                            type={getOrderStatusColor(refund.status)}
                                        />
                                    </View>
                                </View>
                            ))
                        ) : (
                            <Text className="text-neutral-40 px-4 py-6">No refunds yet</Text>
                        )}
                    </Card>
                </ScrollView>
            )}
        </SafeAreaView>
    );
};

export default OrderDetailScreen;
