import axios from 'axios';
import { generateJWT } from '@/services/jwt.service';

const API_BASE_URL = process.env.EXPO_PUBLIC_MAINFRAME_API_URL;

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

apiClient.interceptors.request.use(async (config) => {
    const tokenData = { aud: 'mainframe' };
    const jwtToken = generateJWT(tokenData);

    config.headers.Authorization = `Bearer ${jwtToken}`;
    return config;
}, error => Promise.reject(error));

export default apiClient;