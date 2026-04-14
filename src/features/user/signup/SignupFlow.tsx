import {  useState } from 'react';
import { useSignup, SignupForm } from './useSignup';
import { useNavigate } from 'react-router-dom';

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

    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault();

        const success = await signup(form);

        if(success) {
            navigate("/");
        }
    };

    return(
        <form onSubmit={handleSubmit} className='signup-form'>
            <input name='userId' placeholder='아이디' value={form.userId} onChange={handleChange} required/>
            <input name='userPw' type='password' placeholder='비밀번호' value={form.userPw} onChange={handleChange} required/>
            <input name='userNickname' placeholder='닉네임' value={form.userNickname} onChange={handleChange} required/>
            <input name='userEmail' type='email' placeholder='이메일' value={form.userEmail} onChange={handleChange} required/>

            <button type='submit' disabled={isLoading}>
                {isLoading ? '회원가입 중...' : "회원가입"}
            </button>

            {error && <p className='error'>{error}</p>}
        </form>
    );
};