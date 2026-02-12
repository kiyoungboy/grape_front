import apiClient from '../../../services/axiosConfig';

const API_URL = 'api/auth/';

/* 1. 이메일 인증번호 요청 */
export const RequestEmailCode = async (email: string): Promise<string> => {
    const response = await apiClient.post(API_URL + 'email-request',{
        email,
    });
    return response.data; 
};

/* 2. 이메일 인증번호 검증*/
export const VerifyEmailCode = async(email: string, code: string): Promise<string> => {
    const response = await apiClient.post(API_URL + 'email-verify', {
        email,
        code,
    });
    return response.data;
}

