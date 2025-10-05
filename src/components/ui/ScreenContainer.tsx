import React from 'react';
import { ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface ScreenContainerProps {
    children: React.ReactNode;
    className?: string;
    style?: ViewStyle;
    noPadding?: false;
}

function ScreenContainer({ children, className, style, noPadding }: ScreenContainerProps) {
    const paddingClass = noPadding ? '' : 'px-6';

    return (
        <SafeAreaView className={`${paddingClass} ${className}`} style={style}>
            {children}
        </SafeAreaView>
    );
}

export default ScreenContainer;
