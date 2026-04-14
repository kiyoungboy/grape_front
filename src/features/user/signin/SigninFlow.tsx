import { useState } from 'react';
import { useSignin } from './useSignin';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/context/AuthContext';
import SocialLoginButtons from '../../auth/components/SocialLoginButtons';

export const SigninFlow = () => {
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const { signin } = useSignin();
    const { isLoading, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await signin(userId, password);
    };

    return(
        <div className='signin-container'>
            <form onSubmit={handleSubmit} className='login-form'>
                <h2>로그인</h2>
                <input placeholder='아이디' value={userId} onChange={(e) => setUserId(e.target.value)} required/>
                <input type='password' placeholder='비밀번호' value={password} onChange={(e) => setPassword(e.target.value)} required/>
                <button type='submit' disabled={isLoading && isAuthenticated}>
                    {isLoading && isAuthenticated ? '로그인 중 ...' : '로그인'}
                </button>
            </form>

            <div className='auth-links'>
                <button type='button' className='link-button' onClick={() => navigate('/signup')}>회원가입</button>
                <button type='button' className='link-button' onClick={() => navigate('/find-id')}>아이디 찾기</button>
                <button type='button' className='link-button' onClick={() => navigate('/find-pw')}>비밀번호 찾기</button>
            </div>
            <SocialLoginButtons/>
        </div>
    );
};