import axios from "axios";
import { SigninApi } from "../signin/SigninService";

const API_URL = 'http://localhost:8181/module/user/'

export interface SignupRequest {
    userId: string;
    userPw: string;
    userNickname: string;
    userEmail: string;
}

export const SignupApi = {
    async signup(data: SignupRequest): Promise<{ message: string }> {
        const response = await axios.post<{ message?: string; error?: string }>(
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