import React from 'react';
import { View, ViewStyle } from 'react-native';

interface ScreenContainerProps {
    children: React.ReactNode;
    className?: string;
    style?: ViewStyle;
    noPadding?: boolean;
}

const ScreenContainer: React.FC<ScreenContainerProps> = ({
                                                             children,
                                                             className = '',
                                                             style = {},
                                                             noPadding = false,
                                                         }) => {
    const paddingClass = noPadding ? '' : 'px-6';

    return (
        <View className={`${paddingClass} ${className}`} style={style}>
            {children}
        </View>
    );
};

export default ScreenContainer;
