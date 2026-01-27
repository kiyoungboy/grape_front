import { useState } from "react";
import { SignupApi } from "./SignupService";
import { useSignin } from "../signin/useSignin";

export interface SignupForm {
    userId: string;
    userPw: string;
    userNickname: string;
    userEmail: string;
}

export const useSignup = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const { signin } = useSignin();

    const signup = async(form: SignupForm): Promise<boolean> => {
        setIsLoading(true);
        setError('');

        try{
            await SignupApi.signup(form);

            const success = await signin(form.userId, form.userPw);
            return success;
        } catch(error:any){
            setError(error.message || '회원가입 실패');
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    return { signup, isLoading, error };
};