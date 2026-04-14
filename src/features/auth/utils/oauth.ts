
import type { SocialProvider } from "../types/social";
const OAUTH_CONFIG = {
    GOOGLE: {
        clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        authUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
        redirectUri: import.meta.env.VITE_GOOGLE_REDIRECT_URI,
        scope: 'openid email profile',
    },
    KAKAO: {
        clientId: import.meta.env.VITE_KAKAO_CLIENT_ID,
        authUrl: 'https://kauth.kakao.com/oauth/authorize',
        redirectUri: import.meta.env.VITE_KAKAO_REDIRECT_URI,
        scope: '',
    },
    NAVER: {
        clientId: import.meta.env.VITE_NAVER_CLIENT_ID,
        authUrl: 'https://nid.naver.com/oauth2.0/authorize',
        redirectUri: import.meta.env.VITE_NAVER_REDIRECT_URI,
        scope: 'name email',
    },
} as const;

const OAUTH_STATE_KEY = 'oauth_state';

export const createOAuthState = (): string => {
    const state = crypto.randomUUID();
    sessionStorage.setItem(OAUTH_STATE_KEY, state);
    return state;
};

export const getOAuthState = (): string | null => {
    return sessionStorage.getItem(OAUTH_STATE_KEY);
};

export const clearOAuthState = (): void => {
    sessionStorage.removeItem(OAUTH_STATE_KEY);
};

export const buildSocialLoginUrl = (provider: SocialProvider): string => {
    const config = OAUTH_CONFIG[provider];
    const state = createOAuthState();

    const params = new URLSearchParams({
        client_id: config.clientId,
        redirect_uri: config.redirectUri,
        response_type: 'code',
        state,
    });

    if(config.scope) {
        params.append('scope', config.scope);
    }

    return `${config.authUrl}?${params.toString()}`; 
};