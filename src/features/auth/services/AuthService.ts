import apiClient from '../../../services/axiosConfig';
import type { AuthCheck } from '../types/auth';

const API_URL = '/auth/';

interface EmailResponse {
    message: string;
}

export const AuthApi = {

    async checkMeApi():Promise<AuthCheck>{
        const response = await apiClient.get<AuthCheck>(
            API_URL + 'me'
        );
        return response.data;
    },

    /* 이메일 인증번호 요청 */
    async requestEmailCode(email: string): Promise<void> {
        const response = await apiClient.post<EmailResponse>(
            API_URL + 'email-request',
            { email }
        );

        if (response.data.message !== 'success') {
            throw new Error(response.data.message || '인증번호 발송 실패');
        }
    },

    /* 이메일 인증번호 검증 */
    async verifyEmailCode(email: string, code: string): Promise<void> {
        const response = await apiClient.post<EmailResponse>(
            API_URL + 'email-verify',
            { email, code }
        );

        if (response.data.message !== 'success') {
            throw new Error(response.data.message || '인증번호 검증 실패');
        }
    }
};
