import { useEffect, useState } from 'react';
import {
    ProductEnum,
    ProductInterface,
    ProductStatusEnum,
    StoreProductInterface,
} from '@/src/components/products/interfaces/product.interface';
import ProductsService from '@/src/components/products/services/products.service';

const productDescriptions: Record<ProductEnum, { description: string; helpCenterLink: string } | undefined> = {
    [ProductEnum.BANK_PAYMENTS]: {
        description: 'Get paid directly via our bank links.',
        helpCenterLink: 'https://help.montonio.com/en/collections/6462-payments',
    },
    [ProductEnum.BANK_PAYMENT_REFUNDS]: {
        description: 'Manage refunds and payouts in a few clicks.',
        helpCenterLink: 'https://help.montonio.com/en/collections/13663-refunds',
    },
    [ProductEnum.CARD_PAYMENTS]: {
        description: 'Accept and refund card payments, Apple Pay and Google Pay.',
        helpCenterLink: 'https://help.montonio.com/en/collections/11130-new-card-payments',
    },
    [ProductEnum.CARD_PAYMENTS_ADYEN]: {
        description: 'Accept and refund card payments, Apple Pay and Google Pay.',
        helpCenterLink: 'https://help.montonio.com/en/collections/11130-new-card-payments',
    },
    [ProductEnum.PAY_LATER]: {
        description: 'Let customers split the payment up to 3 equal parts interest free. Get paid upfront.',
        helpCenterLink: 'https://help.montonio.com/en/collections/188124-financing-pay-later',
    },
    [ProductEnum.FINANCING]: {
        description: 'Let customers pay up to 72 months with interest. You get paid upfront.',
        helpCenterLink: 'https://help.montonio.com/en/collections/188124-financing-pay-later',
    },
    [ProductEnum.PAYMENT_LINKS]: {
        description: 'Accept payments via shareable links or add them to emails, website, invoices, etc.',
        helpCenterLink: 'https://help.montonio.com/en/collections/6462-payments',
    },
    [ProductEnum.BLIK]: {
        description: 'Accept and refund BLIK payments (PLN only).',
        helpCenterLink: 'https://help.montonio.com/en/collections/11755-blik',
    },
    [ProductEnum.DIRECT_BLIK]: {
        description: 'Accept and refund BLIK payments (PLN only).',
        helpCenterLink: 'https://help.montonio.com/en/collections/11755-blik',
    },
    [ProductEnum.SHIPPING_V1]: undefined,
    [ProductEnum.SHIPPING_V2]: undefined,
};

export function useProducts(storeUuid: string) {
    const [products, setProducts] = useState<StoreProductInterface[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const enrichProduct = (product: ProductInterface): StoreProductInterface => {
        const mapped = productDescriptions[product.product];

        return {
            status: product.status,
            name: product.product,
            description: mapped?.description,
            helpCenterLink: mapped?.helpCenterLink,
        };
    };

    const fetchProducts = async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await ProductsService.getStoreProducts(storeUuid);

            const filteredProducts = response
                .filter(product => ![ProductEnum.SHIPPING_V1, ProductEnum.SHIPPING_V2].includes(product.product))
                .map(product => enrichProduct(product));

            setProducts(filteredProducts);
        } catch (err) {
            console.error('Failed to fetch products:', err);
            setError(err instanceof Error ? err.message : 'Failed to fetch products');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts().then();
    }, [storeUuid]);

    const updateProductStatus = (productName: ProductEnum, status: ProductStatusEnum) => {
        setProducts(prev =>
            prev.map(p => (p.name === productName ? { ...p, status } : p)),
        );
    };

    const refetch = () => {
        fetchProducts().then();
    };

    return {
        products,
        loading,
        error,
        refetch,
        updateProductStatus,
    };
}
