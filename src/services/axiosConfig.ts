import axios from "axios";

let accessToken: string | null = null;

const apiClient = axios.create({
    baseURL: '/api',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json; charset=UTF-8',
        'Accept': 'application/json'
    },
    timeout: 10000
});

apiClient.interceptors.response.use(
    (response) => response,
    async(error) => {
        const originalRequest = error.config;

        if(error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                await apiClient.post('/auth/refresh-token');
                return apiClient(originalRequest);

            } catch (error){
                window.location.href = '/signin'; 
                return Promise.reject(error);
            } 
        }
        return Promise.reject(error);
    }
);

export default apiClient;