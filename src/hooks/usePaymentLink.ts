import { useState, useEffect } from 'react';
import { PaymentLink } from '@/src/components/payment-links/interfaces/payment-link.interface';
import { OrderPaymentStatusEnum } from '@/src/components/orders/enums/order-payment-status.enum';
import apiClient from '@/src/services/api.client';

export const usePaymentLink = (uuid: string) => {
    const [paymentLink, setPaymentLink] = useState<PaymentLink | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPaymentLink = async () => {
            try {
                setLoading(true);
                setError(null);

                // TODO: Replace with actual API call when endpoint is available
                // const response = await apiClient.get(`/payment-links/${uuid}`);
                // setPaymentLink(response.data);

                // Mock data for now - remove when API is ready
                const mockPaymentLink: PaymentLink = {
                    uuid: uuid,
                    description: '325900101',
                    amount: 5.00,
                    currency: 'EUR',
                    createdAt: 'May 5, 2025',
                    expiresAt: 'May 5, 2025',
                    url: 'https://sandbox-pay.montonio.com/3wf-od3-oiwv',
                    status: OrderPaymentStatusEnum.PENDING,
                };

                // Simulate API delay
                setTimeout(() => {
                    setPaymentLink(mockPaymentLink);
                    setLoading(false);
                }, 500);

            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to fetch payment link');
                setLoading(false);
            }
        };

        if (uuid) {
            fetchPaymentLink();
        }
    }, [uuid]);

    return { paymentLink, loading, error };
};
