import { createContext, useContext, ReactNode, useEffect, useState } from "react";
import { setAxiosAccessToken } from "../../../services/axiosConfig";

interface AuthContextType {
    accessToken: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    setAccessToken: (token: string | null ) => void;
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
    const [isLoading, setIsLoading] = useState(false);

    const setAccessToken = (token: string | null) => {
        _setAccessToken(token);
        setAxiosAccessToken(token);
    }

    return (
        <AuthContext.Provider value={{
            accessToken,
            isAuthenticated: !!accessToken,
            isLoading,
            setAccessToken,
            setIsLoading
        }}>
            {children}
        </AuthContext.Provider>
    )
}