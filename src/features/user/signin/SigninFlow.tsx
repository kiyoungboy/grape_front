import { useState } from 'react';
import { useSignin } from './useSignin';

export const SigninFlow = () => {
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const { signin, isLoading, error } = useSignin();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await signin(userId, password);
    };

    return(
        <form onSubmit={handleSubmit} className='login-form'>
            <input placeholder='아이디' value={userId} onChange={(e) => setUserId(e.target.value)} required/>
            <input type='password' placeholder='비밀번호' value={password} onChange={(e) => setPassword(e.target.value)} required/>
            <button type='submit' disabled={isLoading}>
                {isLoading ? '로그인 중 ...' : '로그인'}
            </button>
            {error && <p className='error'>{error}</p>}
        </form>
    );
};