import { useState } from 'react';
import { useTokenVerification } from '../../auth/hooks/useTokenAuth';
import { signinApi } from './SigninService';
import { useNavigate } from 'react-router-dom';

export const useSignin = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const { setLoginTokens, ensureValidToken } = useTokenVerification();
    const navigate = useNavigate();

    const signin = async (userId: string, password: string): Promise<boolean> => {
        setIsLoading(true);
        setError('');

        try{
            const tokens = await signinApi.signin(userId, password);

            setLoginTokens(tokens.accessToken, tokens.refreshToken);

            const isValid = await ensureValidToken();
            if(isValid){
                navigate('/dashboard');
                return true;
            }

            throw new Error('토큰 검증 실패');
        } catch (error: any){
            setError(error.message || '로그인 실패');
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    return { signin, isLoading, error };
}