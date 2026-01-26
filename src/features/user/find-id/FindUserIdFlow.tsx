import { useFindId } from "./useFindId";

export const findIdFlow = () => {
    const {
        email,
        setEmail,
        maskedUserId,
        isLoading,
        error,
        findId
    } = useFindId();

    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault();
        await findId();
    };

    return (
        <form onSubmit={handleSubmit} className="find-id-form">
            <input type="email" placeholder="가입 이메일" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <button type="submit" disabled={isLoading}>
                {isLoading ? '조회 중...' : '아이디 찾기'}
            </button>

            {error && <p className="error">{error}</p>}
            {maskedUserId && (
                <p className="result">회원님의 아이디: {maskedUserId}</p>
            )}
        </form>
    );
};