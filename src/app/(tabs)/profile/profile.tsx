import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react';

const ProfileScreen = () => {
    return (
        <SafeAreaView className="bg-white flex-1">
            <View className="p-6">
                <Text className="text-3xl font-bold color-neutral-60 ">Profile</Text>
            </View>
        </SafeAreaView>
    );
};

export default ProfileScreen;
