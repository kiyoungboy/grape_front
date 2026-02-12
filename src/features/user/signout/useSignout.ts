import { useTokenVerification } from "../../auth/hooks/useTokenAuth";
import { SignoutApi } from "./SignoutService";

export const useSignout = () => {
    const { clearTokens } = useTokenVerification(); 

    const signout = async () => {
        try{
                await SignoutApi.signoutToServer();
        }  finally {
            clearTokens();
        }
    };
    return { signout };
};