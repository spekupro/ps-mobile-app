import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { useGlobalContext } from '@/context/GlobalProvider';
import DokobitAuth from '@/components/auth/DokobitAuth';
import DokobitUserSelection from '@/components/auth/DokobitUserSelection';
import AuthService from '@/services/auth.service';
import { EidUser } from '@/types/eid.interface';

const DokobitAuthScreen = () => {
    const [step, setStep] = useState<'auth' | 'userSelection'>('auth');
    const [users, setUsers] = useState<EidUser[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const { setIsLoggedIn } = useGlobalContext();
    const router = useRouter();

    const handleAuthSuccess = async () => {
        try {
            // Fetch user profile to complete authentication
            await AuthService.getProfile();
            setIsLoggedIn(true);
            router.replace('/orders/orders');
        } catch (err) {
            console.error('Failed to fetch profile:', err);
            handleAuthError('Failed to complete authentication');
        }
    };

    const handleAuthError = (error: string) => {
        console.error('Authentication error:', error);
        router.back();
    };

    const handleCancel = () => {
        router.back();
    };

    const handleUserSelect = async (userUuid: string) => {
        setIsLoading(true);
        try {
            await AuthService.finishEIDAuthentication(userUuid);
            await handleAuthSuccess();
        } catch (err) {
            console.error('Failed to complete user selection:', err);
            handleAuthError('Failed to complete authentication');
        } finally {
            setIsLoading(false);
        }
    };

    // Function to handle user selection when multiple users are found
    // This will be used when the DokobitAuth component needs to show user selection
    // const handleUserSelection = (users: EidUser[]) => {
    //     setUsers(users);
    //     setStep('userSelection');
    // };

    if (step === 'userSelection') {
        return (
            <DokobitUserSelection
                users={users}
                onUserSelect={handleUserSelect}
                onCancel={handleCancel}
                isLoading={isLoading}
            />
        );
    }

    return (
        <DokobitAuth
            onAuthSuccess={handleAuthSuccess}
            onAuthError={handleAuthError}
            onCancel={handleCancel}
        />
    );
};

export default DokobitAuthScreen;