export interface User {
    id: string;
    email: string;
    firstName?: string;
    lastName?: string;
    companyName?: string;
    phone?: string;
    createdAt: string;
    lastLoginAt?: string;
}

export interface UserProfile extends User {
    profileImageUrl?: string;
    preferences?: UserPreferences;
}

export interface UserPreferences {
    notifications: boolean;
    darkMode: boolean;
    language: string;
}