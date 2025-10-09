import React from 'react';
import { FlatList, Text, View } from 'react-native';
import { StoreProductInterface } from '@/src/components/products/interfaces/product.interface';
import ProductCard from '@/src/components/products/ProductCard';

interface ProductsListProps {
    products: StoreProductInterface[];
    onProductActivate: (product: StoreProductInterface) => void;
    onProductManage: (product: StoreProductInterface) => void;
    showButtons: boolean;
}

function ProductsList({
    products,
    onProductActivate,
    onProductManage,
    showButtons,
}: ProductsListProps): React.JSX.Element {
    if (products.length === 0) {
        return (
            <View className="flex-1 justify-center items-center p-6">
                <Text className="text-neutral-50 text-center">No products available</Text>
            </View>
        );
    }

    return (
        <FlatList
            data={products}
            keyExtractor={item => item.name}
            renderItem={({ item }) => (
                <ProductCard
                    product={item}
                    onActivate={() => onProductActivate(item)}
                    onManage={() => onProductManage(item)}
                    showButtons={showButtons}
                />
            )}
            contentContainerStyle={{ padding: 16 }}
        />
    );
}

export default ProductsList;
