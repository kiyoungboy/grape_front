import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext";
import { SocialLoginRequest, SocialLoginResponse } from "../types/social";
import { SocialService } from "../services/SocialService";
import { useCallback } from "react";

export const useSocialAuth = () => {
    const navigate = useNavigate();
    const {
        setAccessToken,
        setUser,
        setAuthType,
        setIsLoading,
    } = useAuth();

    const signinWithSocial = (async(payload: SocialLoginRequest): Promise<SocialLoginResponse> => {
        setIsLoading(true);
        try{
            const result = await SocialService.login(payload);
            if(result.accessToken) {
                setAccessToken(result.accessToken);
                setUser({
                        email: result.email,
                        name: result.name,
                        nickname: result.nickname,
                });
                setAuthType("SOCIAL");
            }
            return result;
        } finally {
            setIsLoading(false);
        }
    });

    const handleOAuthCallback = useCallback(async(payload: SocialLoginRequest) => {
        const result = await signinWithSocial(payload);
        console.log("OAuth result:", result);
        if(result.accessToken){
            navigate("/");
            return;
        }
    }, [signinWithSocial, navigate]);

    return {
        signinWithSocial,
        handleOAuthCallback,
    };
};