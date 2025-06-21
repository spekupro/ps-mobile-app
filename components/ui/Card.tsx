import React from 'react';
import { View } from 'react-native';

interface CardProps {
    children: React.ReactNode;
    className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = "" }) => {
    return (
        <View className={`mx-6 my-6 p-4 border-2 border-neutral-20 rounded-md ${className}`}>
            {children}
        </View>
    );
};

export default Card;