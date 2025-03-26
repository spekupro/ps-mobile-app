import React, { useState } from 'react';
import {
    Alert,
    Image,
    Text,
    View,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import images from '@/constants/images';
import CustomButton from '@/components/CustomButton';
import CustomTextInput from '@/components/CustomTextInput';
import icons from '@/constants/icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Redirect, useRouter } from 'expo-router';
import { useGlobalContext } from '@/context/GlobalProvider';
import apiClient from '@/services/api.client';

const App = () => {
    const { isLoggedIn, setIsLoggedIn } = useGlobalContext();

    if (isLoggedIn) {
        return <Redirect href={'/orders'} />;
    }

    const [form, setForm] = useState({
        email: '',
        password: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const router = useRouter();

    const submit = async () => {
        if (!form.email || !form.password) {
            Alert.alert('Error', 'Please enter a valid email');
            return;
        }

        setIsSubmitting(true);

        try {
            console.log(form.email);
            console.log(form.password);
            await apiClient.post<any>('/auth/password-login', {
                email: form.email,
                password: form.password,
            });
            setIsLoggedIn(true);
            router.replace('/orders');
        } catch (e) {
            //Alert.alert('Error', e.message);
            console.log(e);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <KeyboardAwareScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps="handled"
            enableOnAndroid={true}
        >
            <SafeAreaView className="w-full h-1/3 bg-primary-50">
                <Image
                    source={images.MontonioLogo}
                    resizeMode="contain"
                    tintColor="white"
                    className="w-60 m-10"
                />
            </SafeAreaView>
            <SafeAreaView className="w-full h-full bg-neutral px-10">
                <Text className="text-4xl font-bold color-neutral-60">Welcome back!</Text>
                <View className="py-5">
                    <CustomTextInput
                        title="Email"
                        value={form.email}
                        handleChangeText={(email: string) => setForm({ ...form, email: email })}
                        otherStyles="mt-7"
                        image={icons.MailIcon}
                        keyboardType="email-address"
                    ></CustomTextInput>
                    <CustomTextInput
                        title="Password"
                        value={form.password}
                        handleChangeText={(password: string) => setForm({ ...form, password: password })}
                        otherStyles="mt-7"
                    ></CustomTextInput>
                </View>
                <View className="flex-row justify-between">
                    <CustomButton
                        title="Log in"
                        containerStyles="bg-primary-50 w-[150px] mt-7"
                        textStyles="text-neutral"
                        handlePress={submit}
                        isLoading={isSubmitting}
                    />
                    <CustomButton
                        title="Log in with e-ID"
                        containerStyles="border-2 border-neutral-30 w-[150px] mt-7"
                        textStyles="text-neutral-60"
                        handlePress={submit}
                        isLoading={isSubmitting}
                    />
                </View>
            </SafeAreaView>
            <StatusBar style="light" backgroundColor="#301BB5" />
        </KeyboardAwareScrollView>
    );
};

export default App;