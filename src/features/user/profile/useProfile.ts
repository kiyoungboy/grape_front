import { useState, useEffect } from 'react';
import { ProfileApi, ProfileResponse } from './ProfileService';

export const useProfile = () => {
    const [profile, setProfile] = useState<ProfileResponse | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async (): Promise<boolean> => {
        setIsLoading(true);
        setError('');
        try{
            const data = await ProfileApi.getProfile();
            setProfile(data);
            return true;
        } catch(error: any) {
            setError(error.message || '프로필 로딩 실패');
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    const updateProfile = async(data: any): Promise<boolean> => {
        setIsLoading(true);
        setError('');
        try{
            await ProfileApi.updateProfile(data);
            await fetchProfile();
            return true;
        } catch(error: any) {
            setError(error.message || '프로필 수정 실패');
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    return {
        profile,
        isLoading,
        error,
        fetchProfile,
        updateProfile
    };
};