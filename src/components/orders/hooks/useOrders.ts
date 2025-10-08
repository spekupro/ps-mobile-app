import { useEffect, useState } from 'react';
import { OrderInterface } from '@/src/components/orders/interfaces/order.interface';
import apiClient from '@/src/services/api.client';

interface OrderFilterDateRange {
    name: string;
    type: 'dateRange';
}

interface OrderFilterList {
    name: string;
    type: 'list';
    options: string[];
}

interface AppliedFilters {
    [key: string]: string[] | { startDate?: Date; endDate?: Date };
}

type OrderFilter = OrderFilterDateRange | OrderFilterList;

export function useOrders() {
    const [orders, setOrders] = useState<OrderInterface[]>([]);
    const [filters, setFilters] = useState<OrderFilter[]>([]);
    const [appliedFilters, setAppliedFilters] = useState<AppliedFilters>({});
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [offset, setOffset] = useState(0);
    const [hasMore, setHasMore] = useState(true);

    const fetchFilters = async () => {
        try {
            const response = await apiClient.get<OrderFilter[]>(
                '@api/stargate/orders/filters',
            );
            setFilters(response.data);
            return response.data;
        } catch (err) {
            console.error('Failed to fetch filters:', err);
            return [];
        }
    };

    const fetchOrders = async (filterParams?: AppliedFilters, search?: string, currentOffset = 0, append = false) => {
        try {
            if (append) {
                setLoadingMore(true);
            } else {
                setLoading(true);
            }
            setError(null);

            const params = new URLSearchParams();
            params.append('limit', '20');
            params.append('offset', currentOffset.toString());
            params.append('orderBy', 'createdAt');
            params.append('order', 'DESC');

            // Add search query if provided and >= 3 characters
            const searchToUse = search !== undefined ? search : searchQuery;
            if (searchToUse && searchToUse.length >= 3) {
                params.append('search', searchToUse);
            }

            const filtersToUse = filterParams !== undefined ? filterParams : appliedFilters;
            Object.entries(filtersToUse).forEach(([key, value]) => {
                if (Array.isArray(value) && value.length > 0) {
                    value.forEach(item => params.append(key, item));
                } else if (value && typeof value === 'object' && 'startDate' in value) {
                    const dates: string[] = [];
                    if (value.startDate) {
                        dates.push(value.startDate.toISOString());
                    }
                    if (value.endDate) {
                        dates.push(value.endDate.toISOString());
                    }
                    if (dates.length > 0) {
                        dates.forEach(date => params.append(key, date));
                    }
                }
            });

            const response = await apiClient.get<OrderInterface[]>(
                `@api/stargate/orders/?${params.toString()}`,
            );

            if (append) {
                setOrders(prev => [...prev, ...response.data]);
            } else {
                setOrders(response.data);
            }

            setHasMore(response.data.length === 20);
            setOffset(currentOffset + response.data.length);
        } catch (err) {
            if (!append) {
                setOrders([]);
            }
            setError(err instanceof Error ? err.message : 'Failed to fetch orders');
        } finally {
            setLoading(false);
            setLoadingMore(false);
        }
    };

    useEffect(() => {
        fetchFilters().then();
        fetchOrders().then();
    }, []);

    const applyFilters = (newFilters: AppliedFilters) => {
        setAppliedFilters(newFilters);
        setOffset(0);
        setHasMore(true);
        fetchOrders(newFilters, searchQuery, 0, false).then();
    };

    const applySearch = (query: string) => {
        setSearchQuery(query);
        setOffset(0);
        setHasMore(true);
        fetchOrders(appliedFilters, query, 0, false).then();
    };

    const loadMore = () => {
        if (!loadingMore && !loading && hasMore) {
            fetchOrders(appliedFilters, searchQuery, offset, true).then();
        }
    };

    const refetch = () => {
        setOrders([]);
        setOffset(0);
        setHasMore(true);
        fetchOrders(appliedFilters, searchQuery, 0, false).then();
    };

    return {
        orders,
        filters,
        loading,
        loadingMore,
        error,
        hasMore,
        refetch,
        applyFilters,
        applySearch,
        loadMore,
    };
}
