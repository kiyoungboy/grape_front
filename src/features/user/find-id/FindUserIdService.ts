import { AuthApi } from "../../auth/services/AuthService";
import apiClient from "../../../services/axiosConfig";

const API_URL = '/user/'

interface FindIdResponse {
    maskedUserId: string;
    message: string;
}

export const FindIdApi = {
    async sendVerificationCode(email: string): Promise<void> {
        await AuthApi.requestEmailCode(email);
    },

    async verifyCode(email: string, code: string): Promise<void> {
        await AuthApi.verifyEmailCode(email, code);
    },

    async findId(email: string): Promise<{ maskedUserId: string }> {
        const response = await apiClient.post<FindIdResponse>(
            API_URL + 'find-id',
            { email }
        );

        if (response.data.message !== 'success') {
            throw new Error(response.data.message || '아이디 찾기 실패');
        }

        return { maskedUserId: response.data.maskedUserId };
    }
}
