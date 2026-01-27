import { useState } from "react";
import { FindIdApi } from "./FindUserIdService";

export const useFindId = () => {
    const [email, setEmail] = useState('');
    const [maskedUserId, setMaskedUserId] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const findId = async(): Promise<boolean> => {
        setIsLoading(true);
        setError('');
        setMaskedUserId('');

        try{
            const response = await FindIdApi.findId(email);
            setMaskedUserId(response.maskedUserId);
            return true;
        } catch(error: any){
            setError(error.message || '아이디 찾기 실패');
            return false;
        } finally{
            setIsLoading(false);
        }
    };

    return {
        email,
        setEmail,
        maskedUserId,
        isLoading,
        error,
        findId
    };
};