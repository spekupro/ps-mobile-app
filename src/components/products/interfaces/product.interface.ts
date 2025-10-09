export enum ProductEnum {
    BANK_PAYMENTS = 'bank_payments',
    BANK_PAYMENT_REFUNDS = 'bank_payment_refunds',
    CARD_PAYMENTS = 'card_payments',
    CARD_PAYMENTS_ADYEN = 'card_payments_adyen',
    PAY_LATER = 'pay_later',
    FINANCING = 'financing',
    PAYMENT_LINKS = 'payment_links',
    BLIK = 'blik',
    DIRECT_BLIK = 'direct_blik',
    SHIPPING_V1 = 'shipping_v1',
    SHIPPING_V2 = 'shipping_v2',
}

export enum ProductStatusEnum {
    INACTIVE = 'inactive',
    ONBOARDING_STARTED = 'onboarding_started',
    IN_REVIEW = 'in_review',
    BEING_ACTIVATED = 'being_activated',
    ACTIVE = 'active',
    REJECTED = 'rejected',
    DEACTIVATED = 'deactivated',
    SUSPENDED = 'suspended',
    USABLE_IN_TEST_MODE = 'usable_in_test_mode',
}

export enum ProductTransitionEnum {
    REQUEST_ACTIVATION = 'request_activation',
    APPROVE_ACTIVATION = 'approve_activation',
    ACTIVATE = 'activate',
    DEACTIVATE = 'deactivate',
    REJECT_ACTIVATION = 'reject_activation',
    SUSPEND = 'suspend',
}

export interface ProductInterface {
    product: ProductEnum;
    status: ProductStatusEnum;
}

export interface ProductTransitionInterface {
    transition: ProductTransitionEnum;
    disabled: boolean;
}

export interface StoreProductInterface {
    name: ProductEnum;
    status: ProductStatusEnum;
    description?: string;
    helpCenterLink?: string;
    transitions?: ProductTransitionInterface[];
}
