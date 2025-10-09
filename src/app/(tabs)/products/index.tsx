import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useEffect } from 'react';
import { useProducts } from '@/src/components/products/hooks/useProducts';
import { useGlobalContext } from '@/src/context/GlobalProvider';
import ProductsList from '@/src/components/products/ProductsList';
import { StoreProductInterface } from '@/src/components/products/interfaces/product.interface';

const ProductsScreen = () => {
    const { setIsLoading, currentStoreUuid } = useGlobalContext();
    const { products, loading, error } = useProducts(currentStoreUuid || '');

    useEffect(() => {
        setIsLoading(loading);
    }, [loading, setIsLoading]);

    const handleProductActivate = (product: StoreProductInterface) => {
        console.log('Activate product modal:', product.name);
    };

    const handleProductManage = (product: StoreProductInterface) => {
        console.log('Manage product modal:', product.name);
    };

    // TODO: Implement proper logic to determine if buttons should be shown
    // Based on user role and store status
    const showButtons = true;

    if (!currentStoreUuid) {
        return (
            <SafeAreaView className="bg-white flex-1" edges={['top']}>
                <View className="flex-1 justify-center items-center p-6">
                    <Text className="text-neutral-50 text-center">No store available</Text>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView className="bg-white flex-1" edges={['top']}>
            <View className="p-6 border-b border-neutral-20">
                <Text className="text-3xl font-bold color-neutral-60">Products</Text>
            </View>

            {error ? (
                <View className="flex-1 justify-center items-center p-6">
                    <Text className="text-red-500">Error: {error}</Text>
                </View>
            ) : (
                <ProductsList
                    products={products}
                    onProductActivate={handleProductActivate}
                    onProductManage={handleProductManage}
                    showButtons={showButtons}
                />
            )}
        </SafeAreaView>
    );
};

export default ProductsScreen;
