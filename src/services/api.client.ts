import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { environment } from '@/src/common/constants/environment';

const apiClient = axios.create({
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

apiClient.interceptors.request.use(async (config: InternalAxiosRequestConfig) => {
    if (config.url && config.url.includes('@api')) {
        config.url = config.url.replace('@api', environment.apiURL);
    }

    return config;
}, error => Promise.reject(error));

apiClient.interceptors.response.use(
    (response: AxiosResponse) => {
        return response;
    },
    (error) => {
        if (error.response?.status === 401) {
            console.log('Unauthorized access - redirecting to login');
        }
        return Promise.reject(error);
    },
);

export default apiClient;
