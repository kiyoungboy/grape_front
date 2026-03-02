import { AuthApi } from "../../auth/services/AuthService";
import apiClient from "../../../services/axiosConfig";

const API_URL = '/user/';

interface FindPwRequest {
    userId: string;
    newPassword: string;
    email: string;
}

interface FindPwResponse {
    message: string;
}

export const FindPwApi = {
    async sendVerificationCode(email: string): Promise<void> {
        await AuthApi.requestEmailCode(email);
    },

    async verifyCode(email: string, code: string): Promise<void> {
        await AuthApi.verifyEmailCode(email, code);
    },

    async resetPassword(request: FindPwRequest): Promise<void> {
        const response = await apiClient.post<FindPwResponse>(
            API_URL + 'find-pw',
            {
                userId: request.userId,
                newPassword: request.newPassword,
                email: request.email
            }
        );

        if (response.data.message !== 'success') {
            throw new Error(response.data.message || '비밀번호 재설정 실패');
        }
    }
};
