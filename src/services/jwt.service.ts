import JWT from 'expo-jwt';

const SECRET_KEY: string = process.env.EXPO_PUBLIC_INTERNAL_JWT_SECRET as string;

export const generateJWT = (data: object): string => {
    return JWT.encode(data, SECRET_KEY);
};