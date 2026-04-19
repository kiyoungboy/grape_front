import { useState } from 'react';
import { useSignup, SignupForm } from './useSignup';
import { useNavigate } from 'react-router-dom';
import styles from './SignupFlow.module.css';

export const SignupFlow = () => {
    const navigate = useNavigate();

    const [form, setForm] = useState<SignupForm>({
        userId: '',
        userPw: '',
        userNickname: '',
        userEmail: ''
    });

    const { signup, isLoading, error } = useSignup();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const success = await signup(form);

        if (success) {
            navigate("/");
        }
    };

    return (
        <div className={styles.signupContainer}>
            <form onSubmit={handleSubmit} className={styles.signupForm}>

                <h2 className={styles.signupTitle}>회원가입</h2>
                <input
                    className={styles.signupInput}
                    name="userId"
                    placeholder="아이디"
                    value={form.userId}
                    onChange={handleChange}
                    required
                />
                <input
                    className={styles.signupInput}
                    name="userPw"
                    type="password"
                    placeholder="비밀번호"
                    value={form.userPw}
                    onChange={handleChange}
                    required
                />

                <input
                    className={styles.signupInput}
                    name="userNickname"
                    placeholder="닉네임"
                    value={form.userNickname}
                    onChange={handleChange}
                    required
                />

                <input
                    className={styles.signupInput}
                    name="userEmail"
                    type="email"
                    placeholder="이메일"
                    value={form.userEmail}
                    onChange={handleChange}
                    required
                />

                <button
                    className={styles.signupButton}
                    type="submit"
                    disabled={isLoading}
                >
                    {isLoading ? '회원가입 중...' : "회원가입"}
                </button>

                {error && <p className="error">{error}</p>}

            </form>
            <div className="linkButton-container">
                <button type='button' className="linkButton" onClick={() => navigate('/find-id')}>아이디 찾기</button>
                <button type='button' className="linkButton" onClick={() => navigate('/find-pw')}>비밀번호 찾기</button>
                <button type='button' className="linkButton" onClick={() => navigate('/')}>홈으로</button>
            </div>
        </div>
    );
};