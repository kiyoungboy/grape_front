import { SocialProvider } from "../../types/social";
import { buildSocialLoginUrl } from "../../utils/oauth";
import styles from "./SocialLoginButtons.module.css";

const providers: SocialProvider[] = ["GOOGLE", "KAKAO", "NAVER"];

const providerConfig = {
  GOOGLE: {
    label: "Google로 로그인",
    className: styles.google,
    icon: "/icons/social-login/google.png",
  },
  KAKAO: {
    label: "카카오로 로그인",
    className: styles.kakao,
    icon: "/icons/social-login/kakao.png",
  },
  NAVER: {
    label: "네이버로 로그인",
    className: styles.naver,
    icon: "/icons/social-login/naver.png",  
  },
} as const;

export default function SocialLoginButtons() {
  const handleLogin = (provider: SocialProvider) => {
    const url = buildSocialLoginUrl(provider);

    alert("provider: " + provider);
    alert("Full URL: " + url);

    window.location.href = url;
  };

  return (
    <div className={styles.container}>
      {providers.map((provider) => {
        const config = providerConfig[provider];

        return (
          <button
            key={provider}
            type="button"
            className={`${styles.button} ${config.className}`}
            onClick={() => handleLogin(provider)}
          >
            <div className={styles.iconWrapper}>
              <img src={config.icon} alt={provider} />
            </div>

            <div className={styles.textWrapper}>
              {config.label}
            </div>
          </button>
        );
      })}
    </div>
  );
}