import React from 'react';
import { SafeAreaView, Text, View } from 'react-native';

const PaymentLinksScreen = () => {
    return (
        <SafeAreaView className="bg-white flex-1">
            <View className="p-6">
                <Text className="text-3xl font-bold color-neutral-60 ">Payment Links</Text>
            </View>
        </SafeAreaView>
    );
};

export default PaymentLinksScreen;