import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext";
import { SocialLoginRequest, SocialLoginResponse } from "../types/social";
import { SocialService } from "../services/SocialService";
import { useCallback } from "react";

export const useSocialAuth = () => {
    const navigate = useNavigate();
    const {
        checkMe,
        setIsLoading,
    } = useAuth();

    const signinWithSocial = (async(payload: SocialLoginRequest): Promise<SocialLoginResponse> => {
        setIsLoading(true);
        try{
            const result = await SocialService.login(payload);
            return result;
        } finally {
            setIsLoading(false);
        }
    });

    const handleOAuthCallback = useCallback(async(payload: SocialLoginRequest) => {
        const result = await signinWithSocial(payload);
        console.log("OAuth result:", result);
        await checkMe();
        navigate("/", {replace:true});
    }, [signinWithSocial, checkMe, navigate]);

    return {
        signinWithSocial,
        handleOAuthCallback,
    };
};