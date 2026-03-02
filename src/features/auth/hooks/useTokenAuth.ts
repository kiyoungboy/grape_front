import { useState, useCallback, useEffect } from 'react';
import apiClient from '../../../services/axiosConfig';
import { isTokenExpiringSoon } from '../../../utils/jwt';
import { useAuth } from '../context/AuthContext';

const API_URL = '/auth/';

export const useTokenVerification = () => {
    const { accessToken, setAccessToken } = useAuth();
    const { isLoading, setIsLoading } = useAuth();


    const setLoginTokens = useCallback((
        newAccessToken: string
    ) => {
        setAccessToken(newAccessToken);
    }, [setAccessToken]);

    const clearTokens = useCallback(() => {
        setAccessToken(null);
    }, [setAccessToken]);

    const isAccessTokenValid = accessToken ? !isTokenExpiringSoon(accessToken) : false;

    const refreshAccessToken = useCallback(async ():Promise<boolean> => {
        setIsLoading(true);
        try{
            const response = await apiClient.post(API_URL + 'refresh-token', {});
            console.log("refresh성공: "+response.data);
            const newAccessToken = (response.data as any).accessToken;
            if(!newAccessToken) return false;
            setLoginTokens(newAccessToken);

            return true;
        }catch{
            console.log("실패");
            clearTokens();
            return false;
        } 
    }, [clearTokens]);

    const ensureValidToken = useCallback(async (): Promise<boolean> => {
        console.log("ensure start, accessToken: "+accessToken);

        const task = (async () => {
            setIsLoading(true);
            try{
                const token = accessToken;

                if(token && !isTokenExpiringSoon(token)) return true;

                const ok = await refreshAccessToken();
                console.log("ensure finish, accessToken: "+accessToken);
                return ok;
            } finally {
                setIsLoading(false);
            }
        })();

        return task;
        
    }, [accessToken, refreshAccessToken, setIsLoading]);

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