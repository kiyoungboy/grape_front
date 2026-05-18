import { SigninApi } from './SigninService';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/context/AuthContext';
import { useState } from 'react';
import { ApiError } from '../../../errors/ApiError';
import { ErrorCode } from '../../../errors/ErrorCode';

export const useSignin = () => {
    const { checkMe, setIsLoading } = useAuth();
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const signin = async (userId: string, password: string): Promise<boolean> => {
        setIsLoading(true);
        setErrorMessage(null);

        try{
            await SigninApi.signin(userId, password);

            const success = await checkMe();

            if(success){
                sessionStorage.setItem("isAuthenticated", "true");
            }

            navigate('/');
            return true;
        }catch (error) {
            if(error instanceof ApiError) {
                switch(error.code) {
                    case ErrorCode.INVALID_TOKEN:
                        setErrorMessage(
                            "인증 정보가 올바르지 않습니다."
                        );
                        break;

                    case ErrorCode.NETWORK_ERROR:
                        setErrorMessage(
                            "네트워크 연결을 확인해주세요."
                        );
                        break;

                    default:
                        setErrorMessage(
                            error.message
                        );
                }
            } else {
                setErrorMessage(
                    "알 수 없는 오류가 발생했습니다."
                );
            }

            return false;
        }finally{
            setIsLoading(false);
        }
    }
    return { signin, errorMessage };
}