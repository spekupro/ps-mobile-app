import { useState, useCallback } from 'react';
import { Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useGlobalContext } from '@/src/context/GlobalProvider';
import AuthService from '@/src/services/auth.service';
import { DokobitLogin, AuthStep, EidUser } from '@/src/components/auth/interfaces/eid.interface';

interface UseDokobitAuthReturn {
    isLoading: boolean;
    error: string | null;
    pendingUsers: EidUser[] | null;
    showModal: boolean;
    startDokobitAuthentication: () => void;
    closeModal: () => void;
    selectUser: (userUuid: string) => Promise<void>;
    handleDokobitReturn: (returnToken: string) => Promise<void>;
}

/**
 * Complete authentication by fetching user profile and updating global state
 */
const completeAuthentication = async (setIsLoggedIn: (value: boolean) => void, router: any) => {
    try {
        // Fetch user profile to ensure authentication is complete
        const profile = await AuthService.getProfile();

        // Update global authentication state
        setIsLoggedIn(true);

        // Navigate to main app screen
        router.replace('/orders');
    } catch (err) {
        // If profile fetch fails, authentication isn't complete
        throw new Error('Failed to complete authentication');
    }
};

export const useDokobitAuth = (): UseDokobitAuthReturn => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [pendingUsers, setPendingUsers] = useState<EidUser[] | null>(null);
    const [showModal, setShowModal] = useState(false);
    const { setIsLoggedIn } = useGlobalContext();
    const router = useRouter();

    const startDokobitAuthentication = useCallback(() => {
        setShowModal(true);
        setError(null);
    }, []);

    const closeModal = useCallback(() => {
        setShowModal(false);
        setIsLoading(false);
        setError(null);
    }, []);

    const handleDokobitReturn = useCallback(async (returnToken: string) => {
        setIsLoading(true);
        setError(null);

        try {
            const result: DokobitLogin = await AuthService.dokobitLogin(returnToken);

            if (result.nextStep === AuthStep.LOGIN) {
                // Direct login successful - complete authentication
                await completeAuthentication(setIsLoggedIn, router);
                closeModal();
            } else if (result.nextStep === AuthStep.SELECT_USER) {
                // User selection required
                setPendingUsers(result.users);
                closeModal();
                // For now, just show alert - we'll implement user selection screen later
                Alert.alert('Multiple Users', 'Multiple users found. User selection not yet implemented.');
            }
        } catch (err) {
            setError('Authentication failed');
            Alert.alert('Error', 'Authentication failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    }, [setIsLoggedIn, router, closeModal]);

    const selectUser = useCallback(async (userUuid: string) => {
        setIsLoading(true);
        setError(null);

        try {
            await AuthService.finishEIDAuthentication(userUuid);
            await completeAuthentication(setIsLoggedIn, router);
            setPendingUsers(null);
        } catch (err) {
            setError('Failed to complete authentication');
            Alert.alert('Error', 'Failed to complete authentication. Please try again.');
        } finally {
            setIsLoading(false);
        }
    }, [setIsLoggedIn, router]);

    return {
        isLoading,
        error,
        pendingUsers,
        showModal,
        startDokobitAuthentication,
        closeModal,
        selectUser,
        handleDokobitReturn,
    };
};

export default useDokobitAuth;
