import apiClient from '../../../services/api.client';
import {
    ProductEnum,
    ProductInterface,
    ProductTransitionEnum,
    ProductTransitionInterface,
} from '@/src/components/products/interfaces/product.interface';

export class ProductsService {
    public static async getStoreProducts(storeUuid: string): Promise<ProductInterface[]> {
        const response = await apiClient.get<ProductInterface[]>(`@api/stores/${storeUuid}/products`);
        return response.data;
    }

    public static async getAvailableTransitions(
        storeUuid: string,
        product: ProductEnum,
    ): Promise<ProductTransitionInterface[]> {
        const response = await apiClient.get<ProductTransitionInterface[]>(
            `@api/stores/${storeUuid}/products/${product}/available-transitions`,
        );
        return response.data;
    }

    public static async applyTransition(
        storeUuid: string,
        product: ProductEnum,
        transition: ProductTransitionEnum,
    ): Promise<ProductInterface> {
        const response = await apiClient.post<ProductInterface>(
            `@api/stores/${storeUuid}/products/${product}/apply-transition`,
            { transition },
        );
        return response.data;
    }
}

export default ProductsService;
