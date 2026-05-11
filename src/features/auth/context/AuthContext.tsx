import { createContext, useContext, ReactNode, useEffect, useState, useCallback } from "react";
import { AuthApi } from "../services/AuthService";
import { AuthCheck } from "../types/auth";

interface AuthContextType {
    user: AuthCheck | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    checkMe: () => Promise<boolean>
    setIsLoading: (loading: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if(!context) throw new Error("useAuth must  be used within AuthProvider");
    return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<AuthCheck | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const isAuthenticated = !!user;

    const checkMe = async (): Promise<boolean> => {
        setIsLoading(true);
        try{
            const data = await AuthApi.checkMeApi();
            setUser(data);
            return true;
        } catch {
            setUser(null);
            sessionStorage.removeItem("isAuthenticated");
            return false;
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        checkMe();
    }, [])

    return (
        <AuthContext.Provider value={{
            user,
            isAuthenticated: !!user,
            isLoading,
            checkMe,
            setIsLoading,
        }}>
            {children}
        </AuthContext.Provider>
    );
};