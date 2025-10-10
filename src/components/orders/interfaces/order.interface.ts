import { OrderPaymentStatusEnum } from '@/src/components/orders/enums/order-payment-status.enum';
import { PaymentIntentStatusEnum } from '@/src/components/orders/enums/payment-intent-status.enum';
import { RefundStatusEnum } from '../enums/refund-status.enum';

export interface OrderInterface {
    uuid: string;
    merchantReference: string;
    storeName: string;
    businessName: string;
    grandTotal: number;
    currency: number;
    paymentMethodType: string;
    paymentStatus: OrderPaymentStatusEnum;
    createdAt: string;
    billingAddress: {
        firstName: string;
        lastName: string;
        phoneNumber: string;
        email: string;
    };
    lineItems: [{
        finalPrice: number;
        name: string;
        quantity: number;
    }];
    paymentIntents: [{
        createdAt: Date;
        amount: number;
        status: PaymentIntentStatusEnum;
    }];
    refunds: [{
        createdAt: Date;
        amount: number;
        status: RefundStatusEnum;
    }];
}
