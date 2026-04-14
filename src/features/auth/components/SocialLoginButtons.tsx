import { SocialProvider } from "../types/social";
import { buildSocialLoginUrl } from "../utils/oauth";

const providers: SocialProvider[] = ['GOOGLE', 'KAKAO', 'NAVER'];

export default function SocialLoginButtons() {
    const handleLogin = (provider: SocialProvider) => {
        const url = buildSocialLoginUrl(provider);
        alert(url);
        window.location.href = url;
    };

    return (
        <div>
            {providers.map((provider) => (
                <button key={provider} type="button" onClick={() => handleLogin(provider)}>
                    {provider} 로그인
                </button>
            ))}
        </div>
    );
}