import { useNavigate } from "react-router-dom"
import { useSignout } from "../../features/user/signout/useSignout";
import { useAuth } from "../../features/auth/context/AuthContext";
import styles from "./Home.module.css";

export const Home = () => {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();
    const { signout } = useSignout();

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h1 className={styles.title}>WELCOME!</h1>
                <p>It is test page.</p>

                {isAuthenticated ?
                    (
                        <div className={styles.section}>
                            <p className={styles.text}>로그인 상태입니다!</p>
                            <button className={styles.primaryButton} onClick={() => {window.location.href = "http://localhost:5173"}}>
                                채팅
                            </button>
                            <button className={styles.secondaryButton} onClick={signout} >
                                로그아웃
                            </button>
                        </div>
                    ) : (
                        <div className={styles.section}>
                            <button className={styles.primaryButton} onClick={() => navigate("/signin")}>
                                로그인
                            </button>

                            <button className={styles.secondaryButton} onClick={() => navigate("/signup")}>
                                회원가입
                            </button>
                        </div>
                    )}
            </div>
        </div>
    );
};