import axios from 'axios'

const API_URL = 'http://localhost:8181/module/auth/';

/* 1. 이메일 인증번호 요청 */
export const requestEmailCode = async (email: string): Promise<string> => {
    const response = await axios.post(API_URL + 'email-request',{
        email,
    });
    return response.data; 
};

/* 2. 이메일 인증번호 검증*/
export const verifyEmailCode = async(email: string, code: string): Promise<string> => {
    const response = await axios.post(API_URL + 'email-verify', {
        email,
        code,
    });
    return response.data;
}

/* 3. 토큰 검증(Access/Refresh Token 유효성 확인) */
export const verifyToken = async(token: string, tokenType: 'ACCESS' | 'REFRESH'): Promise<boolean> => {
    try{
        const headers: Record<string, string> = {
            Authorization: `Bearer ${token}`
        };

        if(tokenType === 'REFRESH'){
            headers['Token-Type'] = 'REFRESH';
        }
        
        const response = await axios.post(API_URL + 'token-verify', 
            { tokenType }, 
            { headers }
        );
        return response.data === 'ok';
    }catch {
        return false;
    }
};
