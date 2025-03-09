export interface OrderInterface {
    uuid: string;
    merchantReference: string;
    grandTotal: number;
    paymentMethodType: string;
}