import React, { useState } from 'react';
import { Image, ImageSourcePropType, KeyboardTypeOptions, Text, TextInput, TouchableOpacity, View } from 'react-native';
import icons from '@/src/common/constants/icons';

interface TextInputProps {
    title?: string,
    handleChangeText?: (input: string) => void,
    value?: string,
    placeholder?: string,
    otherStyles?: string,
    keyboardType?: KeyboardTypeOptions,
    image?: ImageSourcePropType,
    showClearButton?: boolean,
}

const CustomTextInput: React.FC<TextInputProps> = (
    {
        title,
        handleChangeText,
        value,
        otherStyles,
        placeholder,
        keyboardType,
        image,
        showClearButton = false,
    }: TextInputProps) => {
    const [showPassword, setShowPassword] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    return (
        <View className={`space-y-2 ${otherStyles}`}>
            <Text className="text-base text-neutral-60">
                {title}
            </Text>
            <View
                className={`border-2 w-full h-16 px-4 rounded-xl items-center flex-row
                ${isFocused ? 'border-primary-30' : 'border-neutral-30'}`}
            >
                <TextInput
                    className="flex-1 text-neutral-60 h-full"
                    value={value}
                    placeholder={placeholder}
                    placeholderTextColor="#94A3B8"
                    onChangeText={handleChangeText}
                    secureTextEntry={title === 'Password' && !showPassword}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    keyboardType={keyboardType}
                />

                {showClearButton && value && value.length > 0 && (
                    <TouchableOpacity onPress={() => handleChangeText?.('')} className="mr-2">
                        <Image
                            source={icons.CloseIcon}
                            className="w-5 h-5"
                            resizeMode="contain"
                        />
                    </TouchableOpacity>
                )}

                {image && (
                    <Image
                        source={image}
                        className="w-6 h-6"
                        resizeMode="contain"
                    />
                )}

                {title === 'Password' && (
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                        <Image
                            source={!showPassword ? icons.EyeIcon : icons.EyeOffIcon}
                            className="w-6 h-6"
                            resizeMode="contain"
                        />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};

export default CustomTextInput;
