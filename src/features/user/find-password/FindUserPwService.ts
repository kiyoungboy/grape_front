import axios from "axios";
import { RequestEmailCode, VerifyEmailCode } from "../../auth/services/AuthService";

const API_URL = 'http://localhost:8181/module/user/';

export interface FindPwRequest {
    userId: string;
    newPassword: string;
    email: string;
}

export const FindPwApi = {
    async sendVerificationCode(email: string): Promise<void> {
        await RequestEmailCode(email);
    },

    async verifyCode(email: string, code: string): Promise<void> {
        await VerifyEmailCode(email, code);
    },

    async resetPassword(request: FindPwRequest): Promise<{ message: string }> {
        const response = await axios.post<{ message?: string; error?: string }>(
            API_URL + 'find-pw',
            {
                userId: request.userId,
                newPassword: request.newPassword,
                email: request.email,
                verified: true //임시로 true 추후 서버에서 준 true값을 지정
            }
        );

        if(response.data.error){
            throw new Error(response.data.error);
        }

        return { message: response.data.message || 'success' };
    }
};