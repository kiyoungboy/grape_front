import { useNavigate } from "react-router-dom";
import { useFindPw } from "./useFindPw";

export const FindPwFlow = () => {
    const {
        step,
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
    } = useFindPw();
    const navigate = useNavigate();

    const handleEmailSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await sendCode();
    };

    const handleCodeSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await verifyCode();
    };

    const handleNewPwSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await resetPassword();
    };

    return (
        <div className="reset-pw-flow">
            {step === 'EMAIL' && (
                <form onSubmit={handleEmailSubmit}>
                    <h2>비밀번호 찾기</h2>
                    <input placeholder="회원 아이디" value={userId} onChange={(e) => setUserId(e.target.value)} required />
                    <input type="email" placeholder="가입 이메일" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <button type="submit" disabled={isLoading}>
                        {isLoading ? '인증번호 발송 중...' : '인증번호 발송'}
                    </button>
                </form>
            )}

            {step === 'CODE' && (
                <form onSubmit={handleCodeSubmit}>
                    <h2>비밀번호 찾기</h2>
                    <p>이메일로 발송된 인증번호를 입력하세요.</p>
                    <input type="text" placeholder="인증번호 6자리" value={code} onChange={(e) => setCode(e.target.value)} required />
                    <button type="submit" disabled={isLoading}>
                        {isLoading ? '검증 중...' : '인증번호 확인'}
                    </button>
                </form>
            )}

            {step === 'NEW_PW' && (
                <form onSubmit={handleNewPwSubmit}>
                    <h2>비밀번호 찾기</h2>
                    <p>새로운 비밀번호를 입력하세요.</p>
                    <input type="password" placeholder="새 비밀번호" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
                    <input type="password" placeholder="새 비밀번호 확인" value={newPasswordConfirm} onChange={(e) => setNewPasswordConfirm(e.target.value)} required />
                    <button type="submit" disabled={isLoading}>
                        {isLoading ? '변경 중...' : '비밀번호 변경'}
                    </button>
                </form>
            )}

            {step === 'DONE' && (
                <div className="success-reset-password">
                    <h3>비밀번호 변경 완료!</h3>
                    <p>새 비밀번호로 로그인해 주세요.</p>
                    <button onClick={() => navigate('/signin')}>
                        로그인
                    </button>
                </div>
            )}

            {error && <p className="error">{error}</p>}
        </div>
    );
};
