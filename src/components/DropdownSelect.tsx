import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import React from 'react';

interface DropdownSelectProps {
    title: string;
    values: string[];
    selectedValue?: string;
    handleValueChange?: (itemValue: string, itemIndex: number) => void,
}

const DropdownSelect: React.FC<DropdownSelectProps> = ({ title, values, selectedValue, handleValueChange }) => {
    return (
        <View className="space-y-2 mt-7">
            <Text className="text-base text-neutral-60">{title}</Text>
            <View className="border-2 w-full px-4 h-16 rounded-xl border-primary">
                <Picker
                    selectedValue={selectedValue ?? values[0]}
                    onValueChange={handleValueChange}
                    style={styles.pickerStyles}
                    mode={'dropdown'}
                >
                    {values.map((value) => (
                        <Picker.Item key={value} label={value} value={value} />
                    ))}
                </Picker>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    pickerStyles: {
        width: '100%',
        height: 'auto',
        backgroundColor: 'red',
    },
});

export default DropdownSelect;