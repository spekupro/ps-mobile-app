import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import CustomTextInput from '@/src/components/CustomTextInput';
import icons from '@/src/common/constants/icons';

interface OrdersHeaderProps {
    searchQuery: string;
    onSearchChange: (query: string) => void;
    onRefresh: () => void;
}

function OrdersHeader({ searchQuery, onSearchChange, onRefresh }: OrdersHeaderProps) {
    return (
        <View className="p-6">
            <View className="flex-row justify-between items-center mb-2">
                <Text className="text-3xl font-bold color-neutral-60">Orders</Text>
                <TouchableOpacity onPress={onRefresh} className="p-2">
                    <Image source={icons.RefreshIcon} className="w-6 h-6" />
                </TouchableOpacity>
            </View>

            <CustomTextInput
                placeholder="Search by Order ID"
                value={searchQuery}
                image={icons.SearchIcon}
                handleChangeText={onSearchChange}
            />
        </View>
    );
}

export default OrdersHeader;
