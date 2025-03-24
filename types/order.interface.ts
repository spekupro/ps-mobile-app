import { OrderPaymentStatusEnum } from '@/utils/enums/order-payment-status.enum';

export interface OrderInterface {
    uuid: string;
    merchantReference: string;
    grandTotal: number;
    currency: number;
    paymentMethodType: string;
    paymentStatus: OrderPaymentStatusEnum;
    createdAt: string;
}