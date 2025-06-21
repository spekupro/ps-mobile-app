import { useState, useEffect } from 'react';
import { OrderInterface } from '@/types/order.interface';
import apiClient from '@/services/api.client';

export const useOrders = () => {
    const [orders, setOrders] = useState<OrderInterface[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchOrders = async () => {
        try {
            setLoading(true);
            setError(null);
            
            const response = await apiClient.get<OrderInterface[]>(
                'stargate/orders/?limit=10&offset=0&orderBy=createdAt&order=DESC'
            );
            setOrders(response.data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch orders');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const refetch = () => {
        fetchOrders();
    };

    return {
        orders,
        loading,
        error,
        refetch
    };
};