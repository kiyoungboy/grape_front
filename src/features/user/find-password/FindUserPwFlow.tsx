import { useNavigate } from "react-router-dom";
import { useFindPw } from "./useFindPw";
import styles from "./FindUserPwFlow.module.css";

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
        <div className={styles.resetPwFlow}>

            {step === 'EMAIL' && (
                <form className={styles.form} onSubmit={handleEmailSubmit}>
                    <h2 className={styles.title}>비밀번호 찾기</h2>

                    <input
                        className={styles.input}
                        placeholder="회원 아이디"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                        required
                    />

                    <input
                        className={styles.input}
                        type="email"
                        placeholder="가입 이메일"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <button
                        className={styles.button}
                        type="submit"
                        disabled={isLoading}
                    >
                        {isLoading ? '인증번호 발송 중...' : '인증번호 발송'}
                    </button>
                </form>
            )}

            {step === 'CODE' && (
                <form className={styles.form} onSubmit={handleCodeSubmit}>
                    <h2 className={styles.title}>비밀번호 찾기</h2>

                    <p className={styles.description}>
                        이메일로 발송된 인증번호를 입력하세요.
                    </p>

                    <input
                        className={styles.input}
                        type="text"
                        placeholder="인증번호 6자리"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        required
                    />

                    <button
                        className={styles.button}
                        type="submit"
                        disabled={isLoading}
                    >
                        {isLoading ? '검증 중...' : '인증번호 확인'}
                    </button>
                </form>
            )}

            {step === 'NEW_PW' && (
                <form className={styles.form} onSubmit={handleNewPwSubmit}>
                    <h2 className={styles.title}>비밀번호 찾기</h2>

                    <p className={styles.description}>
                        새로운 비밀번호를 입력하세요.
                    </p>

                    <input
                        className={styles.input}
                        type="password"
                        placeholder="새 비밀번호"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                    />

                    <input
                        className={styles.input}
                        type="password"
                        placeholder="새 비밀번호 확인"
                        value={newPasswordConfirm}
                        onChange={(e) => setNewPasswordConfirm(e.target.value)}
                        required
                    />

                    <button
                        className={styles.button}
                        type="submit"
                        disabled={isLoading}
                    >
                        {isLoading ? '변경 중...' : '비밀번호 변경'}
                    </button>
                </form>
            )}

            {step === 'DONE' && (
                <div className={styles.success}>
                    <h3 className={styles.successTitle}>
                        비밀번호 변경 완료!
                    </h3>

                    <p className={styles.description}>
                        새 비밀번호로 로그인해 주세요.
                    </p>

                    <button
                        className={styles.button}
                        onClick={() => navigate('/signin')}
                    >
                        로그인
                    </button>
                </div>
            )}

            {error && <p className="error">{error}</p>}
            <div className="linkButton-container">
                <button type='button' className="linkButton" onClick={() => navigate('/find-pw')}>비밀번호 찾기</button>
                <button type='button' className="linkButton" onClick={() => navigate('/')}>홈으로</button>
            </div>
        </div>
    );
};