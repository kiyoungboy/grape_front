import { useState, useCallback, useEffect } from 'react';
import apiClient from '../../../services/axiosConfig';
import { isTokenExpiringSoon } from '../../../utils/jwt';
import { useAuth } from '../context/AuthContext';

const API_URL = 'api/auth/';

export const useTokenVerification = () => {
    const { accessToken, setAccessToken } = useAuth();
    const [isLoading, setIsLoading] = useState(false);


    const setLoginTokens = useCallback((
        newAccessToken: string
    ) => {
        setAccessToken(newAccessToken);
        localStorage.setItem('ACCESS_TOKEN', newAccessToken);
    }, [setAccessToken]);

    const clearTokens = useCallback(() => {
        setAccessToken(null);
        localStorage.removeItem('ACCESS_TOKEN');
    }, [setAccessToken]);

    const isAccessTokenValid = accessToken ? !isTokenExpiringSoon(accessToken) : false;

    const refreshAccessToken = useCallback(async ():Promise<boolean> => {
        setIsLoading(true);
        try{
            const response = await apiClient.post(API_URL + 'refresh-token', {});
            const newAccessToken = (response.data as any).accessToken;
            localStorage.setItem('ACCESS_TOKEN', newAccessToken);

            if(!newAccessToken) return false;

            setAccessToken(newAccessToken);
            return true;
        }catch{
            clearTokens();
            return false;
        } finally{
            setIsLoading(false);
        }
    }, [clearTokens]);

    const ensureValidToken = useCallback(async (): Promise<boolean> => {
        let token = accessToken;
        if(!token) {
            token = localStorage.getItem('ACCESS_TOKEN');
            if(token) setAccessToken(token); 
        }

        if(token && !isTokenExpiringSoon(token)) return true;

        return await refreshAccessToken();
    }, [accessToken, refreshAccessToken]);

    return {
        accessToken,
        isAccessTokenValid,
        setLoginTokens,
        refreshAccessToken,
        clearTokens,
        ensureValidToken,
        isLoading
    };
};