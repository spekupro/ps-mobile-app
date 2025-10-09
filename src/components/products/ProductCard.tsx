import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { ProductStatusEnum, StoreProductInterface } from '@/src/components/products/interfaces/product.interface';
import StatusLozenge from '@/src/components/StatusLozenge';
import CustomButton from '@/src/components/CustomButton';

interface ProductCardProps {
    product: StoreProductInterface;
    onActivate: () => void;
    onManage: () => void;
    showButtons: boolean;
}

export const getProductStatusColor = (status: ProductStatusEnum): 'main' | 'neutral' | 'info' | 'success' | 'warning' | 'error' => {
    switch (status) {
        case ProductStatusEnum.ACTIVE:
        case ProductStatusEnum.USABLE_IN_TEST_MODE:
            return 'success';
        case ProductStatusEnum.IN_REVIEW:
        case ProductStatusEnum.BEING_ACTIVATED:
        case ProductStatusEnum.ONBOARDING_STARTED:
            return 'warning';
        case ProductStatusEnum.SUSPENDED:
        case ProductStatusEnum.DEACTIVATED:
        case ProductStatusEnum.REJECTED:
            return 'error';
        case ProductStatusEnum.INACTIVE:
        default:
            return 'neutral';
    }
};

const formatProductName = (name: string): string => {
    return name
        .split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
};

// TODO This is wrong
const shouldShowActivateButton = (status: ProductStatusEnum): boolean => {
    return [
        ProductStatusEnum.INACTIVE,
        ProductStatusEnum.DEACTIVATED,
        ProductStatusEnum.SUSPENDED,
        ProductStatusEnum.REJECTED,
    ].includes(status);
};

function ProductCard({ product, onActivate, onManage, showButtons }: ProductCardProps): React.JSX.Element {
    const showActivate = shouldShowActivateButton(product.status);

    return (
        <View className="border border-neutral-30 rounded-xl p-4 mb-3">
            <View className="flex-row justify-between items-start mb-2">
                <Text className="text-lg font-semibold color-neutral-60 flex-1">
                    {formatProductName(product.name)}
                </Text>
                <StatusLozenge
                    status={product.status as any}
                    type={getProductStatusColor(product.status)}
                />
            </View>

            {product.description && (
                <Text className="text-sm color-neutral-50">
                    {product.description}
                </Text>
            )}

            {product.helpCenterLink && (
                <TouchableOpacity
                    onPress={() => console.log('Open help center:', product.helpCenterLink)}
                    className="mb-2"
                >
                    <Text className="text-sm color-primary-50 font-medium">
                        Setup Instructions →
                    </Text>
                </TouchableOpacity>
            )}

            {showButtons && (
                <View className="flex-row justify-end">
                    {showActivate ? (
                        <CustomButton
                            title="Activate"
                            handlePress={onActivate}
                            containerStyles="bg-primary-50 px-6 py-2"
                            textStyles="text-white text-sm"
                        />
                    ) : (
                        <CustomButton
                            title="Manage"
                            handlePress={onManage}
                            containerStyles="border-2 border-neutral-30 px-4 py-2"
                            textStyles="color-neutral-60 text-xs"
                        />
                    )}
                </View>
            )}
        </View>
    );
}

export default ProductCard;
