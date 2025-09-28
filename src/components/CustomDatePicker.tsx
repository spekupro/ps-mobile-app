import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

interface CustomButtonProps {
    title: string,
    handlePress?: () => void,
    containerStyles?: string,
    textStyles?: string,
    isLoading?: boolean,
}

const CustomDatePicker: React.FC<CustomButtonProps> = ({
                                                           title,
                                                           handlePress,
                                                           containerStyles,
                                                           textStyles,
                                                           isLoading,
                                                       }) => {
    return (
        <TouchableOpacity
            onPress={handlePress}
            activeOpacity={0.7}
            className={`rounded-xl min-h-[62px] justify-center items-center ${containerStyles} ${isLoading ? 'opacity-50' : ''}`}
            disabled={isLoading}
        >
            <Text className={`text-lg ${textStyles}`}>
                {title}
            </Text>
        </TouchableOpacity>
    );
};

export default CustomDatePicker;