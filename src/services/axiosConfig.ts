import axios from "axios";

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

        if(!originalRequest) {
            return Promise.reject(error);
        }

        const requestUrl = originalRequest.url ?? "";

        if(requestUrl.includes('/auth/refresh-token')) {
            sessionStorage.removeItem("isAuthenticated");
            return Promise.reject(error);
        }

        if(requestUrl.includes("/user/signin") || requestUrl.includes("/user/signup")) {
            return Promise.reject(error);
        }

        const isAuthenticated = sessionStorage.getItem("isAuthenticated") === "true";


        if(isAuthenticated && error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                await apiClient.post('/auth/refresh-token');
                return apiClient(originalRequest);

            } catch (error){
                sessionStorage.removeItem("isAuthenticated");
                window.location.href = '/signin'; 
                return Promise.reject(error);
            } 
        }
        return Promise.reject(error);
    }
);

export default apiClient;