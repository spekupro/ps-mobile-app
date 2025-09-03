import { useState, useEffect } from 'react';
import { OrderInterface } from '@/types/order.interface';
import apiClient from '@/services/api.client';

export const useOrderDetail = (orderUuid: string) => {
    const [order, setOrder] = useState<OrderInterface | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchOrderDetail = async () => {
        if (!orderUuid) return;

        try {
            setLoading(true);
            setError(null);

            const response = await apiClient.get<OrderInterface>(`@api/stargate/internal/orders/${orderUuid}`);
            setOrder(response.data);
            console.log(response.data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch order details');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrderDetail().then();
    }, [orderUuid]);

    const refetch = () => {
        fetchOrderDetail().then();
    };

    return {
        order,
        loading,
        error,
        refetch,
    };
};
