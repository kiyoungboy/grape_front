import axios from "axios";

let accessToken: string | null = null;

export const setAxiosAccessToken = (token: string | null) => {
    accessToken = token;
}

const apiClient = axios.create({
    baseURL: '/api',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json; charset=UTF-8',
        'Accept': 'application/json'
    },
    timeout: 10000
});

let isRefreshing = false;
let failedQueue: Array<{ resolve: (value?: any) => void; reject: (reason?: any) => void}> = [];

const processQueue = (error: any = null) => {
    failedQueue.forEach(promise => {
        if(error) promise.reject(error);
        else promise.resolve();
    });
    failedQueue = [];
}

apiClient.interceptors.request.use(config => {
    if(config.url?.includes('/signin')) return config;

    if(accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
})

apiClient.interceptors.response.use(
    (response) => response,
    async(error) => {
        const originalRequest = error.config;
        if(error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            if(isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                }).then(() => {
                    return apiClient(originalRequest);
                }).catch(err => Promise.reject(err));
            }

            isRefreshing = true;
            try {
                const response = await apiClient.post('/auth/refresh-token');
                const newToken = response.data.accessToken as string;

                if(newToken){
                    const { setAccessToken } = require("../features/auth/context/AuthContext").authContextValue;
                    setAccessToken(newToken);

                    processQueue();
                    originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
                    return apiClient(originalRequest);
                }else{
                    throw new error("No new token");
                }

            } catch (error){
                processQueue(error);
                window.location.href = '/signin'; 
                return Promise.reject(error);
            } finally {
                isRefreshing = false;
                failedQueue = [];
            }
        }
        return Promise.reject(error);
    }
);

export default apiClient;