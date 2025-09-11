import { OrderPaymentStatusEnum } from '@/utils/enums/order-payment-status.enum';

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
        status: OrderPaymentStatusEnum;
    }];
    refunds: [{
        createdAt: Date;
        amount: number;
        status: OrderPaymentStatusEnum;
    }];
}
