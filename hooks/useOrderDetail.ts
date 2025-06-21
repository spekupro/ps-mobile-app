import { useState, useEffect } from 'react';
import { OrderInterface } from '@/types/order.interface';
import apiClient from '@/services/api.client';

export const useOrderDetail = (orderId: string) => {
    const [order, setOrder] = useState<OrderInterface | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchOrderDetail = async () => {
        if (!orderId) return;

        try {
            setLoading(true);
            setError(null);

            const response = await apiClient.get<OrderInterface>(`stargate/orders/${orderId}`);
            setOrder(response.data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch order details');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrderDetail();
    }, [orderId]);

    const refetch = () => {
        fetchOrderDetail();
    };

    return {
        order,
        loading,
        error,
        refetch,
    };
};