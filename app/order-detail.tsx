import React, { useEffect } from 'react';
import { SafeAreaView, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useOrderDetail } from '@/hooks/useOrderDetail';
import { useGlobalContext } from '@/context/GlobalProvider';
import StatusLozenge, { getOrderStatusColor } from '@/components/StatusLozenge';
import Card from '@/components/ui/Card';
import { formatDate } from '@/utils/helpers/date.helper';
import icons from '@/constants/icons';
import { Image } from 'react-native';

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
                    <View className="p-6 border-b border-neutral-20">
                        <Text
                            className="text-2xl font-bold text-neutral-80 mb-1">{order.merchantReference}</Text>
                        <Text className="text-neutral-40 text-sm mb-2">UUID: {order.uuid}</Text>
                        <StatusLozenge
                            status={order.paymentStatus}
                            type={getOrderStatusColor(order.paymentStatus)}
                        />
                    </View>

                    {/* Order Details Card */}
                    <Card className="my-0 mx-0 border-0 rounded-none border-b border-neutral-20">
                        <Text className="text-xl font-bold mb-4">Order details</Text>

                        <View className="space-y-3">
                            <View className="flex-row justify-between">
                                <Text className="text-neutral-60">Order ID</Text>
                                <Text className="font-medium">{order.merchantReference}</Text>
                            </View>

                            <View className="flex-row justify-between">
                                <Text className="text-neutral-60">Business legal name</Text>
                                <Text className="font-medium">{order.businessName}</Text>
                            </View>

                            <View className="flex-row justify-between">
                                <Text className="text-neutral-60">Store name</Text>
                                <Text className="font-medium text-blue-600">{order.storeName}</Text>
                            </View>
                        </View>
                    </Card>

                    {/* Customer Card */}
                    <Card className="my-0 mx-0 border-0 rounded-none border-b border-neutral-20">
                        <Text className="text-xl font-bold mb-4">Customer</Text>

                        <View className="space-y-3">
                            <View className="flex-row justify-between">
                                <Text className="text-neutral-60">Name</Text>
                                <Text
                                    className="font-medium">{order.billingAddress?.firstName} {order.billingAddress?.lastName}</Text>
                            </View>

                            <View className="flex-row justify-between">
                                <Text className="text-neutral-60">Phone</Text>
                                <Text className="font-medium">{order.billingAddress?.phoneNumber || '-'}</Text>
                            </View>

                            <View className="flex-row justify-between">
                                <Text className="text-neutral-60">Email</Text>
                                <Text className="font-medium">{order.billingAddress?.email || '-'}</Text>
                            </View>
                        </View>
                    </Card>

                    {/* Items Card */}
                    <Card className="my-0 mx-0 border-0 rounded-none border-b border-neutral-20">
                        <Text className="text-xl font-bold mb-4">Items</Text>

                        {/* Table Header */}
                        <View className="bg-neutral-10 p-3 rounded-md mb-3">
                            <View className="flex-row justify-between">
                                <Text className="font-medium text-neutral-60 flex-1">Name</Text>
                                <Text className="font-medium text-neutral-60 w-20 text-center">Quantity</Text>
                                <Text className="font-medium text-neutral-60 w-20 text-right">Price</Text>
                            </View>
                        </View>

                        {/* TODO: Add API request to fetch line items */}
                        {order.lineItems ? (
                            order.lineItems.map((item: any, index: number) => (
                                <View key={index} className="flex-row justify-between py-2">
                                    <Text className="flex-1">{item.name}</Text>
                                    <Text className="w-20 text-center">{item.quantity}</Text>
                                    <Text className="w-20 text-right">€{item.price}</Text>
                                </View>
                            ))
                        ) : (
                            <Text className="text-neutral-50 py-4">Line items not available - need additional API
                                call</Text>
                        )}

                        {/* Total */}
                        <View className="border-t border-neutral-20 pt-3 mt-3">
                            <View className="flex-row justify-between">
                                <Text className="font-bold text-lg">Total</Text>
                                <Text className="font-bold text-lg">€{order.grandTotal}</Text>
                            </View>
                        </View>
                    </Card>

                    {/* Payments Card */}
                    <Card className="my-0 mx-0 border-0 rounded-none border-b border-neutral-20">
                        <Text className="text-xl font-bold mb-4">Payments</Text>

                        {/* Table Header */}
                        <View className="bg-neutral-10 p-3 rounded-md mb-3">
                            <View className="flex-row justify-between">
                                <Text className="font-medium text-neutral-60 flex-1">Date</Text>
                                <Text className="font-medium text-neutral-60 flex-1">Payment method</Text>
                                <Text className="font-medium text-neutral-60 w-20 text-center">Amount</Text>
                                <Text className="font-medium text-neutral-60 w-20 text-center">Status</Text>
                            </View>
                        </View>

                        {order.paymentIntents?.map((intent: any, index: number) => (
                            <View key={index} className="flex-row justify-between items-center py-3">
                                <View className="flex-1">
                                    <Text className="font-medium">{formatDate(intent.createdAt)}</Text>
                                </View>
                                <View className="flex-1">
                                    <Text>Payment Initiation</Text>
                                </View>
                                <View className="w-20">
                                    <Text className="text-center">€{intent.amount}</Text>
                                </View>
                                <View className="w-20">
                                    <View className="items-center">
                                        <StatusLozenge
                                            status={intent.status}
                                            type={getOrderStatusColor(intent.status)}
                                        />
                                    </View>
                                </View>
                            </View>
                        ))}
                    </Card>

                    {/* Refunds Card */}
                    <Card className="my-0 mx-0 border-0 rounded-none">
                        <Text className="text-xl font-bold mb-4">Refunds</Text>

                        {/* Table Header */}
                        <View className="bg-neutral-10 p-3 rounded-md mb-3">
                            <View className="flex-row justify-between">
                                <Text className="font-medium text-neutral-60 flex-1">Date</Text>
                                <Text className="font-medium text-neutral-60 flex-1">Refund type</Text>
                                <Text className="font-medium text-neutral-60 w-20 text-center">Amount</Text>
                                <Text className="font-medium text-neutral-60 w-20 text-center">Status</Text>
                            </View>
                        </View>

                        {order.refunds?.length > 0 ? (
                            order.refunds.map((refund: any, index: number) => (
                                <View key={index} className="flex-row justify-between items-center py-3">
                                    <View className="flex-1">
                                        <Text className="font-medium">{formatDate(refund.createdAt)}</Text>
                                    </View>
                                    <View className="flex-1">
                                        <Text>{refund.type}</Text>
                                    </View>
                                    <View className="w-20">
                                        <Text className="text-center">€{refund.amount}</Text>
                                    </View>
                                    <View className="w-20">
                                        <View className="items-center">
                                            <StatusLozenge
                                                status={refund.status}
                                                type={getOrderStatusColor(refund.status)}
                                            />
                                        </View>
                                    </View>
                                </View>
                            ))
                        ) : (
                            <Text className="text-neutral-50 py-4">No refunds yet</Text>
                        )}
                    </Card>
                </ScrollView>
            )}
        </SafeAreaView>
    );
};

export default OrderDetailScreen;
