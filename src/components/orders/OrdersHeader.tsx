import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import CustomTextInput from '@/src/components/CustomTextInput';
import icons from '@/src/common/constants/icons';

interface OrdersHeaderProps {
    searchQuery: string;
    onSearchChange: (query: string) => void;
    onRefresh: () => void;
    onFilterPress: () => void;
}

function OrdersHeader({ searchQuery, onSearchChange, onRefresh, onFilterPress }: OrdersHeaderProps) {
    return (
        <View className="p-6 border-b border-neutral-20">
            <View className="flex-row justify-between items-center">
                <Text className="text-3xl font-bold color-neutral-60">Orders</Text>
                <TouchableOpacity onPress={onRefresh} className="py-2 px-5">
                    <Image source={icons.RefreshIcon} className="w-6 h-6" />
                </TouchableOpacity>
            </View>

            <View className="flex-row gap-2 items-end">
                <View className="flex-1">
                    <CustomTextInput
                        placeholder="Search by Order ID"
                        value={searchQuery}
                        image={icons.SearchIcon}
                        handleChangeText={onSearchChange}
                        showClearButton={true}
                    />
                </View>
                <TouchableOpacity
                    onPress={onFilterPress}
                    className="flex-row items-center justify-center gap-2 px-4 h-16 border-2 border-neutral-30 rounded-xl"
                >
                    <Image source={icons.FilterIcon} className="w-6 h-6" />
                    <Text className="font-medium color-neutral-60">Filter</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default OrdersHeader;
