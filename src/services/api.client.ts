import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { generateJWT } from '@/src/services/jwt.service';
import { environment } from '@/src/common/constants/environment';

const apiClient = axios.create({
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

// Add request interceptor to handle @api prefix replacement and JWT token
apiClient.interceptors.request.use(async (config: InternalAxiosRequestConfig) => {
    // Replace @api prefix with actual API URL (similar to partner system)
    if (config.url && config.url.includes('@api')) {
        config.url = config.url.replace('@api', environment.apiURL);
    }

    // Add JWT token for authentication
    const tokenData = { aud: 'mainframe' };
    const jwtToken = generateJWT(tokenData);
    config.headers.Authorization = `Bearer ${jwtToken}`;

    return config;
}, error => Promise.reject(error));

// Add response interceptor to handle API responses (similar to partner system)
apiClient.interceptors.response.use(
    (response: AxiosResponse) => {
        // Handle successful responses
        return response;
    },
    (error) => {
        // Handle authentication errors
        if (error.response?.status === 401) {
            // Handle unauthorized - similar to partner system's auth interceptor
            console.log('Unauthorized access - redirecting to login');
        }
        return Promise.reject(error);
    },
);

export default apiClient;
