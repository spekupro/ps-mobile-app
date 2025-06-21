import React from 'react';
import { View, Text } from 'react-native';
import CustomTextInput from '@/components/CustomTextInput';
import icons from '@/constants/icons';

interface OrdersHeaderProps {
    searchQuery: string;
    onSearchChange: (query: string) => void;
}

const OrdersHeader: React.FC<OrdersHeaderProps> = ({ searchQuery, onSearchChange }) => {
    return (
        <View className="p-6">
            <Text className="text-3xl font-bold color-neutral-60">Orders</Text>
            
            <CustomTextInput
                placeholder="Search by Order ID"
                value={searchQuery}
                image={icons.SearchIcon}
                handleChangeText={onSearchChange}
            />
        </View>
    );
};

export default OrdersHeader;