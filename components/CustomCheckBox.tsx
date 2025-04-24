import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

interface CustomCheckBoxProps {
    title: string;
    subText?: string;
    handleValueChange?: (input: boolean) => void,
}

const CustomCheckBox: React.FC<CustomCheckBoxProps> = ({ title, subText, handleValueChange }) => {
    return (
        <View className="space-y-2 mt-7 flex-row">
            <BouncyCheckbox
                size={20}
                style={styles.checkBoxStyles}
                onPress={handleValueChange}
                innerIconStyle={styles.innerIconStyle}
                iconImageStyle={styles.iconImageStyle}
                fillColor="#442DD2"
            >
            </BouncyCheckbox>
            <View className="w-11/12">
                <Text className="text-base text-neutral-60">{title}</Text>
                <Text className="text-xs text-neutral-60">{subText}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    checkBoxStyles: {
        alignItems: 'flex-start',
        paddingTop: 4,
    },
    innerIconStyle: {
        borderWidth: 1,
        borderRadius: 6,
        backgroundColor: 'white',
    },
    iconImageStyle: {
        tintColor: '#442DD2',
    },
});

export default CustomCheckBox;