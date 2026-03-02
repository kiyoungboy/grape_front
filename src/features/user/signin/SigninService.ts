import apiClient from "../../../services/axiosConfig";

const API_URL = '/user/'

interface SigninRequest {
    userId: string;
    password: string; 
}

interface SigninResponse {
    accessToken: string;
    message: string;
}

export const SigninApi = {
    async signin(userId: string, password: string): Promise<{ accessToken: string }>{
        const response = await apiClient.post<SigninResponse>(
            API_URL + 'signin',
            { userId, password } as SigninRequest
        );
        if(response.data.message !== 'success'){
            throw new Error(response.data.message || '로그인 실패');
        }

        return {
            accessToken: response.data.accessToken
        };
    }
}