import React from 'react';
import { SafeAreaView, Text, View } from 'react-native';

const CreatePaymentLinkScreen = () => {
    return (
        <SafeAreaView className="bg-white flex-1">
            <View className="p-6">
                <Text className="text-3xl font-bold color-neutral-60 ">Create Payment Link</Text>
            </View>
        </SafeAreaView>
    );
};

export default CreatePaymentLinkScreen;