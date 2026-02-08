import { SigninApi } from "../signin/SigninService";
import apiClient from "../../../services/axiosConfig";

const API_URL = '/api/user/'

export interface SignupRequest {
    userId: string;
    userPw: string;
    userNickname: string;
    userEmail: string;
}

export const SignupApi = {
    async signup(data: SignupRequest): Promise<{ message: string }> {
        console.log('TEST5');
        const response = await apiClient.post<{ message?: string; error?: string }>(
            API_URL + 'signup',
            data
        );

        if(response.data.error){
            throw new Error(response.data.error);
        }

        return { message: response.data.message || 'success' };
    },

    async loginAfterSignup(userId: string, password: string) {
        return SigninApi.signin(userId, password);
    }
};