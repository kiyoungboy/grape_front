import apiClient from "../../../services/axiosConfig";

const API_URL = 'api/user/'

interface SigninRequest {
    userId: string;
    password: string; 
}

interface TokenDto {
    accessToken: string;
    refreshToken: string;
}

export const SigninApi = {
    async signin(userId: string, password: string): Promise<TokenDto>{
        const response = await apiClient.post<{ accessToken: string; refreshToken: string; message:string }>(
            API_URL + 'signin',
            { userId, password } as SigninRequest
        );

        if(response.data.message !== 'success'){
            throw new Error(response.data.message || '로그인 실패');
        }

        return {
            accessToken: response.data.accessToken!,
            refreshToken: response.data.refreshToken!
        };
    }
}