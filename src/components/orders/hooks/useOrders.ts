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

type OrderFilter = OrderFilterDateRange | OrderFilterList;

export const useOrders = () => {
    const [orders, setOrders] = useState<OrderInterface[]>([]);
    const [filters, setFilters] = useState<OrderFilter[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

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

    const fetchOrders = async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await apiClient.get<OrderInterface[]>(
                '@api/stargate/orders/?limit=20&offset=0&orderBy=createdAt&order=DESC',
            );
            setOrders(response.data);
        } catch (err) {
            setOrders([]);
            setError(err instanceof Error ? err.message : 'Failed to fetch orders');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFilters().then();
        fetchOrders().then();
    }, []);

    const refetch = () => {
        setOrders([]);
        fetchOrders().then();
    };

    return {
        orders,
        filters,
        loading,
        error,
        refetch,
    };
};
