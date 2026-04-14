import { createContext, useContext, ReactNode, useEffect, useState, useCallback } from "react";
import { setAxiosAccessToken } from "../../../services/axiosConfig";
import type { AuthState, AuthUser } from "../types/auth";

interface AuthContextType {
    accessToken: string | null;
    user: AuthUser | null;
    authType: "NORMAL" | "SOCIAL" | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    setAccessToken: (token: string | null ) => void;
    setUser: (user: AuthUser | null) => void;
    setAuthType: (type: "NORMAL" | "SOCIAL" | null) => void;
    setIsLoading: (loading: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if(!context) throw new Error("useAuth must  be used within AuthProvider");
    return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [accessToken, _setAccessToken] = useState<string | null>(null);
    const [user, _setUser] = useState<AuthUser | null>(null);
    const [authType, _setAuthType] = useState<"NORMAL" | "SOCIAL" | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const setAccessToken = useCallback((token: string | null) => {
        _setAccessToken(token);
        setAxiosAccessToken(token);
    }, []);

    const setUser = useCallback((user: AuthUser | null) => {
        _setUser(user);
    }, []);

    const setAuthType = useCallback((authType: "NORMAL" | "SOCIAL" | null) => {
        _setAuthType(authType);
    }, []);


    return (
        <AuthContext.Provider value={{
            accessToken,
            user,
            authType,
            isAuthenticated: !!accessToken,
            isLoading,
            setAccessToken,
            setUser,
            setAuthType,
            setIsLoading,
        }}>
            {children}
        </AuthContext.Provider>
    );
};