import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useSocialAuth } from "../features/auth/hooks/useSocialAuth";
import { useEffect, useRef } from "react";
import { clearOAuthState, getOAuthState } from "../features/auth/utils/oauth";
import { SocialProvider } from "../features/auth/types/social";

export default function OAuthCallbackPage() {
    const { provider } = useParams< { provider: string }>();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { handleOAuthCallback } = useSocialAuth();

    useEffect(() => {

        const code = searchParams.get('code');
        const state = searchParams.get('state');
        const savedState = getOAuthState();

        if(!provider || !code) {
            alert("bad request");
            navigate("/signin");
            return;
        }

        const processedCode = sessionStorage.getItem("oauth_code");
        if (processedCode === code) return;

        sessionStorage.setItem("oauth_code", code);

        const ProcessOAuthLogin = async () => {

            if(savedState && state !== savedState) {
                alert("invalid request");
                clearOAuthState();
                navigate("/signin");
                return;
            }

            try{
                await handleOAuthCallback({
                    provider: provider.toUpperCase() as SocialProvider,
                    code,
                    state: state ?? undefined,
                });
            } catch (error) {
                console.error("social login request failed", error);
                alert("social login request failed");
                navigate("/signin");
            } finally {
                clearOAuthState();
            }
        };

        ProcessOAuthLogin();
    }, []);

    return <div>소셜 로그인 처리 중입니다...</div>
}