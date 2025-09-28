import { OrderPaymentStatusEnum } from '@/src/components/orders/enums/order-payment-status.enum';

export interface PaymentLink {
    uuid: string;
    description: string;
    amount: number;
    currency: string;
    createdAt: string;
    expiresAt: string;
    url: string;
    qrCode?: string;
    status: OrderPaymentStatusEnum;
}

export interface PaymentLinkFieldProps {
    label: string;
    value: string;
    isLink?: boolean;
    href?: string;
}
