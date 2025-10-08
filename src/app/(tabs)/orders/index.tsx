import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useGlobalContext } from '@/src/context/GlobalProvider';
import { useOrders } from '@/src/components/orders/hooks/useOrders';
import OrdersHeader from '@/src/components/orders/OrdersHeader';
import OrdersList from '@/src/components/orders/OrdersList';
import FiltersModal from '@/src/components/filters/FiltersModal';
import { SafeAreaView } from 'react-native-safe-area-context';

const OrdersScreen = () => {
    const router = useRouter();
    const { setIsLoading } = useGlobalContext();
    const { orders, filters, loading, loadingMore, error, refetch, applyFilters, applySearch, loadMore } = useOrders();
    const [searchQuery, setSearchQuery] = useState('');
    const [showFiltersModal, setShowFiltersModal] = useState(false);

    useEffect(() => {
        setIsLoading(loading);
    }, [loading, setIsLoading]);

    useEffect(() => {
        if (searchQuery.length === 0) {
            // Clear search immediately
            applySearch(searchQuery);
            return;
        }

        // Debounce for search queries >= 3 characters
        const timer = setTimeout(() => {
            if (searchQuery.length >= 3) {
                applySearch(searchQuery);
            }
        }, 1000);

        return () => clearTimeout(timer);
    }, [searchQuery]);

    const handleSearchChange = (query: string) => {
        setSearchQuery(query);
    };

    const handleOrderPress = (orderUuid: string) => {
        router.push(`/orders/${orderUuid}/details`);
    };

    const handleApplyFilters = (selectedFilters: any) => {
        applyFilters(selectedFilters);
        setShowFiltersModal(false);
    };

    return (
        <SafeAreaView className="bg-white flex-1" edges={['top']}>
            <View className="flex-1">
                <OrdersHeader
                    searchQuery={searchQuery}
                    onSearchChange={handleSearchChange}
                    onRefresh={refetch}
                    onFilterPress={() => setShowFiltersModal(true)}
                />

                {error ? (
                        <View className="flex-1 justify-center items-center">
                            <Text className="text-red-500">Error: {error}</Text>
                        </View>
                    ) :
                    <OrdersList
                        orders={orders}
                        onOrderPress={handleOrderPress}
                        onEndReached={loadMore}
                        isLoadingMore={loadingMore}
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
