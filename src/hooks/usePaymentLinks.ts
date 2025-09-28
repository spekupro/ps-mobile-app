import { useState, useEffect } from 'react';
import { PaymentLink } from '@/src/components/payment-links/interfaces/payment-link.interface';
import { OrderPaymentStatusEnum } from '@/src/components/orders/enums/order-payment-status.enum';
import apiClient from '@/src/services/api.client';

export const usePaymentLinks = () => {
    const [paymentLinks, setPaymentLinks] = useState<PaymentLink[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchPaymentLinks = async () => {
        try {
            setLoading(true);
            setError(null);

            // TODO: Replace with actual API call when endpoint is available
            // const response = await apiClient.get<PaymentLink[]>('/payment-links');
            // setPaymentLinks(response.data);

            // Mock data for now - remove when API is ready
            const mockPaymentLinks: PaymentLink[] = [
                {
                    uuid: 'c767f871-2905-4bdd-ba12-32ff2d870ae3',
                    description: 'Online Store Payment',
                    amount: 25.99,
                    currency: 'EUR',
                    createdAt: 'May 3, 2025',
                    expiresAt: 'May 10, 2025',
                    url: 'https://sandbox-pay.montonio.com/3wf-od3-oiwv',
                    status: OrderPaymentStatusEnum.PENDING,
                },
                {
                    uuid: 'b456e231-1234-5678-9012-123456789abc',
                    description: 'Service Fee',
                    amount: 15.50,
                    currency: 'EUR',
                    createdAt: 'May 2, 2025',
                    expiresAt: 'May 9, 2025',
                    url: 'https://sandbox-pay.montonio.com/abc-def-ghi',
                    status: OrderPaymentStatusEnum.PAID,
                },
            ];

            // Simulate API delay
            setTimeout(() => {
                setPaymentLinks(mockPaymentLinks);
                setLoading(false);
            }, 500);

        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch payment links');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPaymentLinks();
    }, []);

    const refetch = () => {
        fetchPaymentLinks();
    };

    return {
        paymentLinks,
        loading,
        error,
        refetch,
    };
};
