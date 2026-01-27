import React from 'react';
import { useProfile } from './useProfile';
import { useSignout } from '../signout/useSignout';
import { useNavigate } from 'react-router-dom';

export const ProfileFlow: React.FC = () => {
    const { profile, isLoading, error, fetchProfile } = useProfile();
    const { signout } = useSignout();
    const navigate = useNavigate();

    if(isLoading) {
        return <div>프로필 로딩 중...</div>;
    }

    if(error){
        return(
            <div>
                <p className='error'>{error}</p>
                <button onClick={fetchProfile}>재시도</button>
            </div>
        );
    }

    return(
        <div className='profile-page'>
            <header>
                <h1>마이 프로필</h1>
                <div className='actions'>
                    <button onClick={() => navigate('/dashboard')}>대시보드</button>
                    <button onClick={signout}>로그아웃</button>
                </div>
            </header>

            <main className='profile-content'>
                {profile && (
                    <div className='profile-card'>
                        <div className='profile-info'>
                            <div className='info-row'>
                                <label>아이디:</label>
                                <span>{profile.userId}</span>
                            </div>
                            <div className='info-row'>
                                <label>닉네임:</label>
                                <span>{profile.userNickname}</span>
                            </div>
                            <div className='info-row'>
                                <label>이메일:</label>
                                <span>{profile.userEmail}</span>
                            </div>
                            <div className='info-row'>
                                <label>가입일:</label>
                                <span>{new Date(profile.signupDt).toLocaleDateString()}</span>
                            </div>
                        </div>

                        <div className='profile-actions'>
                            <button onClick={() => navigate('/edit-profile')}>
                                프로필 수정(미구현)
                            </button>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};