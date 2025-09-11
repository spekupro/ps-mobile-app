import apiClient from './api.client';
import { DokobitLogin, DokobitSession, EidUser } from '@/types/eid.interface';
import { environment } from '@/constants/environment';

export interface UserProfile {
    uuid: string;
    firstName: string;
    lastName: string;
    email: string;
    sessionRole: string;
    productionSession: boolean;
    secureSession: boolean;
    passwordChangeRequired: boolean;
    business?: {
        uuid: string;
        name: string;
        country?: string;
    };
}

export class AuthService {
    /**
     * Step 1: Start eID authentication session
     * Returns a Dokobit token that will be used in the authentication flow
     */
    public static async startEIDAuthentication(locale: string = 'en_US'): Promise<DokobitSession> {
        console.log('startEIDAuthentication');
        // https://id-sandbox.dokobit.com/js/dokobit-integration.min.js
        const response = await apiClient.post<DokobitSession>('@api/auth/eid/create-session', {
            locale,
        }, {
            headers: {
                origin: 'http://partner.montonio:4201',
            },
        });
        console.log('response', response.data);
        return response.data;
    }

    /**
     * Step 2: Complete Dokobit authentication
     * After user completes authentication in Dokobit, this processes the return token
     */
    public static async dokobitLogin(returnToken: string): Promise<DokobitLogin> {
        const response = await apiClient.post<DokobitLogin>('@api/auth/eid/login', { returnToken });
        return response.data;
    }

    /**
     * Step 3: Finish eID authentication (when user selection is required)
     * Completes the login process by selecting a specific user
     */
    public static async finishEIDAuthentication(userUuid: string): Promise<void> {
        await apiClient.post('@api/auth/eid/login-selected-user', { userUuid });
    }

    /**
     * Secure existing session with eID (for users who are already logged in)
     */
    public static async dokobitSecureSession(returnToken: string): Promise<void> {
        await apiClient.post('@api/auth/eid/secure-session', { returnToken });
    }

    /**
     * Fetch user profile after successful authentication
     */
    public static async getProfile(): Promise<UserProfile> {
        const response = await apiClient.get<UserProfile>('@api/profile');
        return response.data;
    }

    /**
     * Helper method to build Dokobit authentication URL
     * This creates a URL that will be loaded in the WebView
     */
    public static buildDokobitUrl(token: string): string {
        // Use environment-specific Dokobit URL
        return `${environment.dokobitIdGatewayURL}/api/authentication/create?token=${token}`;
    }
}

export default AuthService;
