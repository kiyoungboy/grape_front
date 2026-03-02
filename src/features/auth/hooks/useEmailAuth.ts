import { useState } from 'react';
import { AuthApi } from '../services/AuthService';

export const useEmailAuth = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [verified, setVerified] = useState(false);

    const sendCode = async (email: string) => {
        setLoading(true);
        setError(null);
        try{
            const message = await AuthApi.requestEmailCode(email);
            return message;
        }catch(e: any){
            setError(e.message ?? '이메일 전송 실패');
            throw e;
        } finally {
            setLoading(false);
        }
    }

    const checkCode = async (email: string, code: string) => {
        setLoading(true);
        setError(null);
        try{
            const message = await AuthApi.verifyEmailCode(email, code);
            setVerified(true);
            return message;
        }catch(e: any){
            setVerified(false);
            setError(e.message ?? '인증 실패');
            throw e;
        } finally {
            setLoading(false);
        }
    }

    return { loading, error, verified, sendCode, checkCode };
};

