import { useState } from "react";
import { FindIdApi } from "./FindUserIdService";

type Step = 'EMAIL' | 'CODE' | 'RESULT';

export const useFindId = () => {
    const [step, setStep] = useState<Step>('EMAIL');

    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const [maskedUserId, setMaskedUserId] = useState('');

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const sendCode = async (): Promise<boolean> => {
        if (!email.trim()) {
            setError('이메일을 입력해 주세요.');
            return false;
        }

        setIsLoading(true);
        setError('');

        try {
            await FindIdApi.sendVerificationCode(email);
            setStep('CODE');
            return true;
        } catch (error: any) {
            setError(error.message || '인증번호 발송 실패');
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    const verifyCode = async (): Promise<boolean> => {
        setIsLoading(true);
        setError('');

        try {
            await FindIdApi.verifyCode(email, code);
            const response = await FindIdApi.findId(email);
            setMaskedUserId(response.maskedUserId);
            setStep('RESULT');
            return true;
        } catch (error: any) {
            setError(error.message || '인증 실패');
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    return {
        step,
        email,
        setEmail,
        code,
        setCode,
        maskedUserId,
        isLoading,
        error,
        sendCode,
        verifyCode
    };
};
