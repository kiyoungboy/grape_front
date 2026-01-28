import { useTokenVerification } from "../../auth/hooks/useTokenAuth";
import { useNavigate } from "react-router-dom";
import { SignoutApi } from "./SignoutService";

export const useSignout = () => {
    const { clearTokens, refreshToken } = useTokenVerification();
    const navigate = useNavigate();

    const signout = async () => {
        try{
            if(refreshToken){
                await SignoutApi.signoutToServer(refreshToken);
            }
        } catch(error){
            console.warn('서버 로그아웃 실패:', error);
        } finally {
            clearTokens();
            navigate('/login', { replace: true });
        }
    };

    return { signout };
};