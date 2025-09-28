import { useState, useEffect } from 'react';
import { OrderInterface } from '@/src/components/orders/interfaces/order.interface';
import apiClient from '@/src/services/api.client';

export const useOrders = () => {
    const [orders, setOrders] = useState<OrderInterface[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchOrders = async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await apiClient.get<OrderInterface[]>(
                '@api/stargate/orders/?limit=10&offset=0&orderBy=createdAt&order=DESC',
            );
            setOrders(response.data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch orders');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders().then();
    }, []);

    const refetch = () => {
        fetchOrders().then();
    };

    return {
        orders,
        loading,
        error,
        refetch,
    };
};
