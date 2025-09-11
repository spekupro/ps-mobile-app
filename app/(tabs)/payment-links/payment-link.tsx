import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Link, useRouter } from 'expo-router';
import CustomTextInput from '@/components/CustomTextInput';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CustomCheckBox from '@/components/CustomCheckBox';
import CustomButton from '@/components/CustomButton';
import apiClient from '@/services/api.client';
import { Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const CreatePaymentLinkScreen = () => {
    const router = useRouter();
    const [form, setForm] = useState({
        description: '',
        expirationDate: '',
        amount: '',
        currency: '',
        askAdditionalInfo: false,
        oneTime: false,
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async () => {
        if (!form.description || !form.amount || !form.currency) {
            Alert.alert('Error', 'Please fill in all required fields');
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await apiClient.post('/payment-links', {
                description: form.description,
                expirationDate: form.expirationDate,
                amount: parseFloat(form.amount),
                currency: form.currency,
                askAdditionalInfo: form.askAdditionalInfo,
                oneTime: form.oneTime,
            });

            // Navigate to payment link detail view
            router.push(`/payment-link-detail?uuid=${response.data.uuid}`);
        } catch (error) {
            Alert.alert('Error', 'Failed to create payment link');
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <SafeAreaView className="bg-white flex-1">
            <View className="p-6">
                <Text className="text-3xl font-bold color-neutral-60 ">New Payment Link</Text>
                <Text className="text-md color-neutral-60 mt-4">
                    Receive payments from a link that you can send to many customers at once!{'\u00A0'}
                    <Link href="https://help.montonio.com/en/articles/148317-how-to-use-montonio-s-payment-links"
                          className={'text-primary'}>
                        Read more.
                    </Link>
                </Text>
            </View>
            <KeyboardAwareScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                keyboardShouldPersistTaps="handled"
                enableOnAndroid={true}
            >
                <View className="mx-6 my-6 p-4 border-2 border-neutral-20 rounded-md">
                    <Text className="text-lg font-semibold">Link information</Text>
                    <Text className="text-md pt-2">Fill the information that will be sent to your customer.</Text>
                    <View
                        style={{
                            padding: 10,
                            borderBottomColor: 'gray',
                            borderBottomWidth: StyleSheet.hairlineWidth,
                        }}
                    />
                    <CustomTextInput
                        title="Description"
                        value={form.description}
                        handleChangeText={(description: string) => setForm({ ...form, description })}
                        otherStyles="mt-4"
                    ></CustomTextInput>
                    <CustomTextInput
                        title="Expiration date"
                        value={form.expirationDate}
                        handleChangeText={(expirationDate: string) => setForm({ ...form, expirationDate })}
                        otherStyles="mt-4"
                    ></CustomTextInput>
                    <CustomTextInput
                        title="Amount"
                        value={form.amount}
                        handleChangeText={(amount: string) => setForm({ ...form, amount })}
                        otherStyles="mt-4"
                        keyboardType="numeric"
                    ></CustomTextInput>
                    <CustomTextInput
                        title="Currency"
                        value={form.currency}
                        handleChangeText={(currency: string) => setForm({ ...form, currency })}
                        otherStyles="mt-4"
                    ></CustomTextInput>
                    <View
                        style={{
                            padding: 10,
                            borderBottomColor: 'gray',
                            borderBottomWidth: StyleSheet.hairlineWidth,
                        }}
                    />
                    <CustomCheckBox
                        title={'I want to receive name and contact details from my paying customer.'}
                        handleValueChange={(askAdditionalInfo: boolean) => setForm({ ...form, askAdditionalInfo })}
                    ></CustomCheckBox>
                    <CustomCheckBox
                        title={'Generate a one-time payment link'}
                        subText={'A one-time payment link can be used for a single transaction and expires once the payment is complete.'}
                        handleValueChange={(oneTime: boolean) => setForm({ ...form, oneTime })}
                    ></CustomCheckBox>
                    <View className="items-center pt-10">
                        <CustomButton
                            title="Create link"
                            containerStyles="bg-primary-50 w-full"
                            textStyles="text-neutral"
                            isLoading={isSubmitting}
                            handlePress={handleSubmit}
                        />
                    </View>
                </View>
            </KeyboardAwareScrollView>
        </SafeAreaView>
    );
};

export default CreatePaymentLinkScreen;
