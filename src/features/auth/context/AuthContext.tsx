import { createContext, useContext, ReactNode, useEffect, useState } from "react";

interface AuthContextType {
    accessToken: string | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    setAccessToken: (token: string | null ) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if(!context) throw new Error("useAuth must  be used within AuthProvider");
    return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [accessToken, setAccessToken] = useState<string | null>(() => {
        return localStorage.getItem('ACCESS_TOKEN');
    });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(false);
        const token = localStorage.getItem('ACCESS_TOKEN');
        setAccessToken(token);
    }, []);



    return (
        <AuthContext.Provider value={{
            accessToken,
            isLoading,
            isAuthenticated: !!accessToken,
            setAccessToken,
        }}>
            {children}
        </AuthContext.Provider>
    )
}