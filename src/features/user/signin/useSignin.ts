import { SigninApi } from './SigninService';
import { useNavigate } from 'react-router-dom';
import { useTokenVerification } from '../../auth/hooks/useTokenAuth';
import { useAuth } from '../../auth/context/AuthContext';

export const useSignin = () => {
    const { setLoginTokens } = useTokenVerification();
    const { isLoading, setIsLoading } = useAuth();
    const navigate = useNavigate();

    const signin = async (userId: string, password: string): Promise<boolean> => {
        try{
            setIsLoading(true);
            const tokens = await SigninApi.signin(userId, password);
            setLoginTokens(tokens.accessToken);
            navigate('/');
            return true;
        }catch (error) {
            return false
        }finally{
            setIsLoading(false);
        }
    }
    return { signin };
}