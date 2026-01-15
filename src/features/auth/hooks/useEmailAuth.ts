import { useState } from 'react';
import { requestEmailCode, verifyEmailCode } from '../services/IAuthService';

export const useEmailAuth = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [verified, setVerified] = useState(false);

    const sendCode = async (email: string) => {
        setLoading(true);
        setError(null);
        try{
            const massage = await requestEmailCode(email);
            return massage;
        }catch(e: any){
            setError(e.massage ?? '이메일 전송 실패');
            throw e;
        } finally {
            setLoading(false);
        }
    }

    const checkCode = async (email: string, code: string) => {
        setLoading(true);
        setError(null);
        try{
            const massage = await verifyEmailCode(email, code);
            setVerified(true);
            return massage;
        }catch(e: any){
            setVerified(false);
            setError(e.massage ?? '인증 실패');
            throw e;
        } finally {
            setLoading(false);
        }
    }

    return { loading, error, verified, sendCode, checkCode };
};

