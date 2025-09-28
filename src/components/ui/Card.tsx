import React from 'react';
import { Text, View } from 'react-native';

interface CardProps {
    children: React.ReactNode;
    header: string;
    className?: string;
}

const Card: React.FC<CardProps> = ({ children, header, className = '' }) => {
    return (
        <View className={`mx-6 mb-6 border-2 border-neutral-20 rounded-md`}>
            <View className={`border-b border-neutral-20`}>
                <Text className={`text-xl font-bold p-4`}>{header}</Text>
            </View>
            <View className={`${className}`}>
                {children}
            </View>
        </View>
    );
};

export default Card;
