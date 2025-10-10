import { OrderPaymentStatusEnum } from '@/src/components/orders/enums/order-payment-status.enum';

export const mapOrderStatusToReadable = (status: OrderPaymentStatusEnum): string => {
    const statusMap: Record<OrderPaymentStatusEnum, string> = {
        [OrderPaymentStatusEnum.PENDING]: 'Pending',
        [OrderPaymentStatusEnum.AUTHORIZED]: 'Authorized',
        [OrderPaymentStatusEnum.AWAITING_SETTLEMENT]: 'Awaiting settlement',
        [OrderPaymentStatusEnum.PARTIALLY_PAID]: 'Partially paid',
        [OrderPaymentStatusEnum.PAID]: 'Paid',
        [OrderPaymentStatusEnum.VOIDED]: 'Voided',
        [OrderPaymentStatusEnum.PARTIALLY_REFUNDED]: 'Partially refunded',
        [OrderPaymentStatusEnum.REFUNDED]: 'Refunded',
    };

    return statusMap[status] || status;
};
