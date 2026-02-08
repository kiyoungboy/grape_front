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

/* 3. 토큰 검증(Access/Refresh Token 유효성 확인) */
export const VerifyToken = async(token: string, tokenType: 'ACCESS' | 'REFRESH'): Promise<boolean> => {
    try{
        const headers: Record<string, string> = {
            Authorization: `Bearer ${token}`
        };
        
        if(tokenType === 'REFRESH'){
            headers['Token-Type'] = 'REFRESH';
        }
        
        console.log("Token-type:"+tokenType);

        const response = await apiClient.post(API_URL + 'token-verify', 
            { tokenType }, 
            { headers }
        );

        console.log("response:"+response)

        return response.data === 'ok';
    }catch {
        return false;
    }
};
