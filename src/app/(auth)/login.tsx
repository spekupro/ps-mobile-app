import React, { useCallback, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as yup from 'yup';
import images from '@/src/common/constants/images';
import CustomButton from '@/src/components/CustomButton';
import CustomTextInput from '@/src/components/CustomTextInput';
import icons from '@/src/common/constants/icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useRouter } from 'expo-router';
import { useGlobalContext } from '@/src/context/GlobalProvider';
import useDokobitAuth from '@/src/hooks/useDokobitAuth';
import DokobitAuth from '@/src/components/auth/DokobitAuth';
import apiClient from '@/src/services/api.client';

interface FormData {
    email: string;
    password: string;
}

interface FormErrors {
    email?: string;
    password?: string;
    general?: string;
}

function getErrorMessage(error: unknown): string {
    if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as { response?: { status?: number } };

        if (axiosError.response?.status === 401) {
            return 'Invalid email or password. Please try again.';
        }
    }

    return 'Unable to connect. Please check your internet connection and try again.';
}

const validationSchema = yup.object().shape({
    email: yup
        .string()
        .email('Please enter a valid email address')
        .required('Email is required'),
    password: yup
        .string()
        .min(1, 'Password is required')
        .required('Password is required'),
});

function LoginScreen() {
    const { setIsLoggedIn } = useGlobalContext();
    const [form, setForm] = useState<FormData>({ email: '', password: '' });
    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();
    const {
        startDokobitAuthentication,
        isLoading: isDokobitLoading,
        showModal,
        closeModal,
        handleDokobitReturn,
    } = useDokobitAuth();

    const handleAuthSuccess = () => {
        setIsLoggedIn(true);
        router.replace('/orders');
        closeModal();
    };

    const handleAuthError = (error: string) => {
        console.error('Auth error:', error);
    };

    const updateFormField = useCallback((field: keyof FormData, value: string) => {
        setForm(prev => ({ ...prev, [field]: value }));
    }, []);

    const submit = useCallback(async () => {
        setErrors({});

        try {
            await validationSchema.validate(form, { abortEarly: false });
        } catch (validationError) {
            if (validationError instanceof yup.ValidationError) {
                const newErrors: FormErrors = {};
                validationError.inner.forEach((error) => {
                    if (error.path) {
                        newErrors[error.path as keyof FormErrors] = error.message;
                    }
                });
                setErrors(newErrors);
                return;
            }
        }

        setIsSubmitting(true);

        try {
            await apiClient.post('@api/auth/password-login', {
                email: form.email,
                password: form.password,
            });
            setIsLoggedIn(true);
            router.replace('/orders');
        } catch (error) {
            console.log(error);
            const errorMessage = getErrorMessage(error);
            setErrors({ general: errorMessage });
        } finally {
            setIsSubmitting(false);
        }
    }, [form, setIsLoggedIn, router]);

    return (
        <KeyboardAwareScrollView
            contentContainerStyle={styles.scrollContainer}
            keyboardShouldPersistTaps="handled"
            enableOnAndroid={true}
        >
            <SafeAreaView className="w-full h-1/3 bg-primary-50">
                <Image
                    source={images.MontonioLogo}
                    resizeMode="contain"
                    className="w-60 m-10"
                />
            </SafeAreaView>
            <SafeAreaView className="w-full h-full bg-white px-10">
                <Text className="text-4xl font-bold color-neutral-60">Welcome back!</Text>
                <View className="py-5">
                    <View>
                        <CustomTextInput
                            title="Email"
                            value={form.email}
                            handleChangeText={(email: string) => updateFormField('email', email)}
                            otherStyles="mt-7"
                            image={icons.MailIcon}
                            keyboardType="email-address"
                        />
                        {errors.email && (
                            <Text className="text-red-500 text-sm mt-1 ml-1">
                                {errors.email}
                            </Text>
                        )}
                    </View>
                    <View>
                        <CustomTextInput
                            title="Password"
                            value={form.password}
                            handleChangeText={(password: string) => updateFormField('password', password)}
                            otherStyles="mt-7"
                        />
                        {errors.password && (
                            <Text className="text-red-500 text-sm mt-1 ml-1">
                                {errors.password}
                            </Text>
                        )}
                    </View>
                    {errors.general && (
                        <View style={styles.errorContainer}>
                            <Text style={styles.errorText}>
                                {errors.general}
                            </Text>
                        </View>
                    )}
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
                        handlePress={startDokobitAuthentication}
                        isLoading={isDokobitLoading}
                    />
                </View>
            </SafeAreaView>

            <DokobitAuth
                visible={showModal}
                onAuthSuccess={handleAuthSuccess}
                onAuthError={handleAuthError}
                onCancel={closeModal}
            />

            <StatusBar style="light" backgroundColor="#301BB5" />
        </KeyboardAwareScrollView>
    );
}

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
    },
    errorContainer: {
        marginTop: 16,
        padding: 12,
        backgroundColor: '#fef2f2',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#fecaca',
    },
    errorText: {
        color: '#dc2626',
        fontSize: 14,
        textAlign: 'center',
    },
});

export default LoginScreen;
