import { SigninApi } from './SigninService';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/context/AuthContext';

export const useSignin = () => {
    const { checkMe, setIsLoading } = useAuth();
    const navigate = useNavigate();

    const signin = async (userId: string, password: string): Promise<boolean> => {
        setIsLoading(true);
        try{
            await SigninApi.signin(userId, password);
            await checkMe();
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