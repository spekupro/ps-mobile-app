import { useState, useCallback } from 'react';
import { Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useGlobalContext } from '@/context/GlobalProvider';
import AuthService from '@/services/auth.service';
import { DokobitLogin, AuthStep, EidUser } from '@/types/eid.interface';

interface UseDokobitAuthReturn {
    isLoading: boolean;
    error: string | null;
    pendingUsers: EidUser[] | null;
    startDokobitAuthentication: () => Promise<void>;
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
        router.replace('/orders/orders');
    } catch (err) {
        // If profile fetch fails, authentication isn't complete
        throw new Error('Failed to complete authentication');
    }
};

export const useDokobitAuth = (): UseDokobitAuthReturn => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [pendingUsers, setPendingUsers] = useState<EidUser[] | null>(null);
    const { setIsLoggedIn } = useGlobalContext();
    const router = useRouter();

    const startDokobitAuthentication = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        
        try {
            // Navigate to the Dokobit authentication screen
            router.push('/dokobit-auth');
        } catch (err) {
            setError('Failed to start Dokobit authentication');
            Alert.alert('Error', 'Failed to start Dokobit authentication. Please try again.');
        } finally {
            setIsLoading(false);
        }
    }, [router]);

    const handleDokobitReturn = useCallback(async (returnToken: string) => {
        setIsLoading(true);
        setError(null);
        
        try {
            const result: DokobitLogin = await AuthService.dokobitLogin(returnToken);
            
            if (result.nextStep === AuthStep.LOGIN) {
                // Direct login successful - complete authentication
                await completeAuthentication(setIsLoggedIn, router);
            } else if (result.nextStep === AuthStep.SELECT_USER) {
                // User selection required
                setPendingUsers(result.users);
                // For now, just show alert - we'll implement user selection screen later
                Alert.alert('Multiple Users', 'Multiple users found. User selection not yet implemented.');
            }
        } catch (err) {
            setError('Authentication failed');
            Alert.alert('Error', 'Authentication failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    }, [setIsLoggedIn, router]);

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
        startDokobitAuthentication,
        selectUser,
        handleDokobitReturn,
    };
};

export default useDokobitAuth;