import { useState } from "react";
import { SignupApi } from "./SignupService";
import { useSignin } from "../signin/useSignin";
import { ApiError } from "../../../errors/ApiError";
import { ErrorCode } from "../../../errors/ErrorCode";

export interface SignupForm {
    userId: string;
    userPw: string;
    userNickname: string;
    userEmail: string;
}

export const useSignup = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const { signin } = useSignin();

    const signup = async(form: SignupForm): Promise<boolean> => {
        setIsLoading(true);
        setErrorMessage("");

        try{
            await SignupApi.signup(form);

            const success = await signin(form.userId, form.userPw);
            return success;
        } catch(error){
            if(error instanceof ApiError) {
                switch (error.code){
                    case ErrorCode.NETWORK_ERROR:
                        setErrorMessage(
                            "네트워크 연결을 확인해주세요."
                        );
                        break;

                    default:
                        setErrorMessage(
                            error.message
                        );
                }
            }else {
                setErrorMessage(
                    "회원가입 중 오류가 발생했습니다."
                );
            }
            return false;
        } finally {
            setIsLoading(false);
        }
    };


    return { signup, isLoading, errorMessage };
};