import { useState, useCallback } from 'react';
import { VerifyToken } from '../services/AuthService';
import axios from 'axios';

const API_URL = 'http://localhost:8181/module/auth/';

export const useTokenVerification = () => {
    const [accessToken, setAccessToken] = useState<string | null>(
        localStorage.getItem('ACCESS_TOKEN_KEY')
    );
    const [isAccessTokenValid, setIsAccessTokenValid] = useState(false);

    const [refreshToken, setRefreshToken] = useState<string | null>(
        localStorage.getItem("REFRESH_TOKEN_KEY")
    );
    const [isRefreshTokenValid, setIsRefreshTokenValid] = useState(false);

    const [isLoading, setIsLoading] = useState(false);

    const setLoginTokens = useCallback((
        newAccessToken: string,
        newRefreshToken: string
    ) => {
        localStorage.setItem('ACCESS_TOKEN_KEY', newAccessToken);
        localStorage.setItem('REFRESH_TOKEN_KEY', newRefreshToken);

        setAccessToken(newAccessToken);
        setRefreshToken(newRefreshToken);
    }, []);

    const clearTokens = useCallback(() => {
        localStorage.removeItem('ACCESS_TOKEN_KEY');
        localStorage.removeItem('REFRESH_TOKEN_KEY');

        setAccessToken(null);
        setRefreshToken(null);
        setIsAccessTokenValid(false);
        setIsRefreshTokenValid(false);
    }, []);

    const validateAccessToken = useCallback(async (): Promise<boolean> =>{
        if(!accessToken) {
            setIsAccessTokenValid(false);
            return false;
        }

        setIsLoading(true);
        try{
            const isTokenValid = await VerifyToken(accessToken, 'ACCESS');
            setIsAccessTokenValid(isTokenValid);

            if(!isTokenValid){
                clearTokens();
            }

            return isTokenValid;
        } finally {
            setIsLoading(false);
        }
    }, [accessToken, clearTokens]);

    const validateRefreshToken = useCallback(async (): Promise<boolean> => {
        if(!refreshToken){
            setIsRefreshTokenValid(false);
            return false;
        }

        setIsLoading(true);
        try{
            const isTokenValid = await VerifyToken(refreshToken, 'REFRESH');
            setIsRefreshTokenValid(isTokenValid);
            return isTokenValid;
        } finally{
            setIsLoading(false);
        }
    }, [refreshToken, clearTokens]);

    const updateAccessToken = useCallback(async (): Promise<string | null> => {
        if(!refreshToken || !await validateRefreshToken()) {
            clearTokens();
            return null;
        }

        setIsLoading(true);
        try{
            /*백엔드 /module/auth/ 호출 */
            const response = await axios.post(API_URL + 'update-token', {}, {
                headers: {
                    'Refresh-Token': refreshToken 
                }
            });

            const { accessToken: newAccessToken } = response.data;
            if(newAccessToken) {
                localStorage.setItem('ACCESS_TOKEN_KEY', newAccessToken);
                setAccessToken(newAccessToken);
                setIsAccessTokenValid(true);
                return newAccessToken;
            }

            return null;
        } catch (error: any) {
            console.error('AccessToken 갱신 실패:', error);
            clearTokens();
            return null;
        } finally {
            setIsLoading(false);
        }
    }, [refreshToken, clearTokens]);

    /*토큰 전체 상태 확인 + 자동 갱신 */
    const ensureValidToken = useCallback(async (): Promise<boolean> => {
        const isAccessValid = await validateAccessToken();
        if( isAccessValid) return true;

        const newToken = await updateAccessToken();
        return !!newToken;
    }, [validateAccessToken, updateAccessToken]);

    return {
        accessToken,
        isAccessTokenValid,
        validateAccessToken,

        refreshToken,
        isRefreshTokenValid,
        validateRefreshToken,

        setLoginTokens,
        updateAccessToken,
        clearTokens,
        ensureValidToken,

        isLoading
    };
};