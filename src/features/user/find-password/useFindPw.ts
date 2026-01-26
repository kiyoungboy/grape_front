import { useState } from 'react'
import { findPwApi } from './FindUserPwService'

type Step = 'EMAIL' | 'CODE' | 'NEW_PW' | 'DONE';

export const useFindPw = () => {
    const [step, setStep] = useState<Step>('EMAIL');

    const [userId, setUserId] = useState('');
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newPasswordConfirm, setNewPasswordConfirm] = useState('');

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const sendCode = async (): Promise<boolean> => {
        if(!userId.trim() || !email.trim()) {
            setError('아이디와 이메일을 모두 입력해 주세요.');
            return false;
        }

        setIsLoading(true);
        setError('');

        try{
            await findPwApi.sendVerificationCode(email);
            setStep('CODE');
            return true;
        } catch (error: any){
            setError(error.message || '인증번호 발송 실패');
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    const verifyCode = async (): Promise<boolean> => {
        setIsLoading(true);
        setError('');
        try{
            await findPwApi.verifyCode(email, code);
            setStep('NEW_PW');
            return true;
        } catch (error: any) {
            setError(error.message || '인증번호 검증 실패');
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    const resetPassword = async (): Promise<boolean> => {
        setIsLoading(true);
        setError('');

        if(newPassword !== newPasswordConfirm) {
            setError('비밀번호가 서로 일치하지 않습니다.');
            setIsLoading(false);
            return false;
        }
        if(!userId.trim() || !email.trim()) {
            setError('아이디와 이메일을 모두 입력해 주세요.');
            setIsLoading(false);
            return false;
        }

        try{
            await findPwApi.resetPassword({
                userId,
                email,
                newPassword
            });
            setStep('DONE');
            return true;
        } catch(error: any) {
            setError(error.message || '비밀번호 재설정 실패');
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    return {
        step,
        setStep,

        userId,
        setUserId,
        email,
        setEmail,
        code,
        setCode,
        newPassword,
        setNewPassword,
        newPasswordConfirm,
        setNewPasswordConfirm,

        isLoading,
        error,

        sendCode,
        verifyCode,
        resetPassword
    };
} ;