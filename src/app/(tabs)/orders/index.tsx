import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useGlobalContext } from '@/src/context/GlobalProvider';
import { useOrders } from '@/src/components/orders/hooks/useOrders';
import { OrderInterface } from '@/src/components/orders/interfaces/order.interface';
import OrdersHeader from '@/src/components/orders/OrdersHeader';
import OrdersList from '@/src/components/orders/OrdersList';
import FiltersModal from '@/src/components/filters/FiltersModal';
import { SafeAreaView } from 'react-native-safe-area-context';

const OrdersScreen = () => {
    const router = useRouter();
    const { setIsLoading } = useGlobalContext();
    const { orders, filters, loading, error, refetch } = useOrders();
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredOrders, setFilteredOrders] = useState<OrderInterface[]>([]);
    const [showFiltersModal, setShowFiltersModal] = useState(false);

    useEffect(() => {
        setIsLoading(loading);
    }, [loading, setIsLoading]);

    useEffect(() => {
        if (searchQuery.trim() === '') {
            setFilteredOrders(orders);
        } else {
            const filtered = orders.filter(order =>
                order.merchantReference.toLowerCase().includes(searchQuery.toLowerCase()) ||
                order.uuid.toLowerCase().includes(searchQuery.toLowerCase()),
            );
            setFilteredOrders(filtered);
        }
    }, [searchQuery, orders]);

    const handleOrderPress = (orderUuid: string) => {
        router.push(`/orders/${orderUuid}/details`);
    };

    const handleApplyFilters = (selectedFilters: any) => {
        console.log('Applied filters:', selectedFilters);
        // TODO: Apply filters to orders
    };

    return (
        <SafeAreaView className="bg-white flex-1" edges={['top']}>
            <View className="flex-1">
                <OrdersHeader
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                    onRefresh={refetch}
                    onFilterPress={() => setShowFiltersModal(true)}
                />

                {error ? (
                        <View className="flex-1 justify-center items-center">
                            <Text className="text-red-500">Error: {error}</Text>
                        </View>
                    ) :
                    <OrdersList
                        orders={filteredOrders}
                        onOrderPress={handleOrderPress}
                    />
                }

                <FiltersModal
                    visible={showFiltersModal}
                    filters={filters}
                    onClose={() => setShowFiltersModal(false)}
                    onApply={handleApplyFilters}
                />
            </View>
        </SafeAreaView>
    );
};

export default OrdersScreen;
