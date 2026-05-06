import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/context/AuthContext";
import { SignoutApi } from "./SignoutService";

export const useSignout = () => {
    const { checkMe, setIsLoading } = useAuth();
    const navigate = useNavigate();

    const signout = async () => {
        try{
            await SignoutApi.signoutToServer();
        } catch (e) {

        } finally {
            await checkMe();
            navigate("/");
            setIsLoading(false);
        }
    };
    
    return { signout };
};