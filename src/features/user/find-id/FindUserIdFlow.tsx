import { useNavigate } from "react-router-dom";
import { useFindId } from "./useFindId";
import styles from "./FindUserIdFlow.module.css";

export const FindIdFlow = () => {
    const {
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
    } = useFindId();

    const navigate = useNavigate();

    const handleEmailSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await sendCode();
    };

    const handleCodeSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await verifyCode();
    };

    return (
        <div className={styles.findIdFlow}>
            {step === 'EMAIL' && (
                <form className={styles.form} onSubmit={handleEmailSubmit}>
                    <h2 className={styles.title}>아이디 찾기</h2>
                    <p className={styles.description}>
                        가입 시 등록한 이메일을 입력해 주세요.
                    </p>
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
                    <h2 className={styles.title}>아이디 찾기</h2>
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
                        {isLoading ? '확인 중...' : '인증번호 확인'}
                    </button>
                </form>
            )}

            {step === 'RESULT' && (
                <div className={styles.result}>
                    <h2 className={styles.title}>아이디 찾기 완료</h2>
                    <p className={styles.description}>
                        회원님의 아이디: <strong>{maskedUserId}</strong>
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