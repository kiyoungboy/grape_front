export interface AuthUser {
    email?: string;
    name?: string;
    nickname?: string;
}

export interface AuthState {
    isAuthenticated: boolean;
    accessToken: string | null;
    refreshToken: string | null;
    user: AuthUser | null;
    isLoading: boolean;
}

export interface AuthCheck {
    userKey: string;
    userEmail: string;
    loginAuth: string;
}