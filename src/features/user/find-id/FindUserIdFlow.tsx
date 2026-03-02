import { useNavigate } from "react-router-dom";
import { useFindId } from "./useFindId";

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
        <div className="find-id-flow">
            {step === 'EMAIL' && (
                <form onSubmit={handleEmailSubmit}>
                    <h2>아이디 찾기</h2>
                    <p>가입 시 등록한 이메일을 입력해 주세요.</p>
                    <input
                        type="email"
                        placeholder="가입 이메일"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <button type="submit" disabled={isLoading}>
                        {isLoading ? '인증번호 발송 중...' : '인증번호 발송'}
                    </button>
                </form>
            )}

            {step === 'CODE' && (
                <form onSubmit={handleCodeSubmit}>
                    <h2>아이디 찾기</h2>
                    <p>이메일로 발송된 인증번호를 입력하세요.</p>
                    <input
                        type="text"
                        placeholder="인증번호 6자리"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        required
                    />
                    <button type="submit" disabled={isLoading}>
                        {isLoading ? '확인 중...' : '인증번호 확인'}
                    </button>
                </form>
            )}

            {step === 'RESULT' && (
                <div className="find-id-result">
                    <h2>아이디 찾기 완료</h2>
                    <p>회원님의 아이디: <strong>{maskedUserId}</strong></p>
                    <button onClick={() => navigate('/signin')}>
                        로그인
                    </button>
                </div>
            )}

            {error && <p className="error">{error}</p>}
        </div>
    );
};
