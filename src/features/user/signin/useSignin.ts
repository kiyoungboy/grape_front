import { SigninApi } from './SigninService';
import { useNavigate } from 'react-router-dom';
import { useTokenVerification } from '../../auth/hooks/useTokenAuth';

export const useSignin = () => {
    const { setLoginTokens } = useTokenVerification();
    const navigate = useNavigate();

    const signin = async (userId: string, password: string): Promise<boolean> => {
        try{
            const tokens = await SigninApi.signin(userId, password);
            setLoginTokens(tokens.accessToken);
            navigate('/');
            return true;
        }catch (error) {
            return false
        }
    }
    return { signin };
}