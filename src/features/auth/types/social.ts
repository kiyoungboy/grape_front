export type SocialProvider = 'GOOGLE' | 'KAKAO' | 'NAVER';

export interface SocialLoginRequest {
    provider: SocialProvider;
    code: string;
    state?: string;
}

export interface SocialUser {
    userKey?: string;
    email?: string;
    name?: string;
    nickname?: string;
}

export interface SocialLoginResponse {
    accessToken?: string;
    refreshToken?: string;
    userKey?: string;
    newUser?: boolean;

    provider?: SocialProvider;
    email?: string;
    name?: string;
    nickname?: string;
    socialUserId?: string;
    providerUserId?: string;

    message?: string;
}
