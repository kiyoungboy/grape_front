import { useNavigate } from "react-router-dom"
import { useSignout } from "../features/user/signout/useSignout";
import { useAuth } from "../features/auth/context/AuthContext";

export const Home = () => {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();
    const { signout } = useSignout();

    return (
        <div style={{ padding: "40px", textAlign: "center" }}>
            <h1>Home</h1>

            {isAuthenticated ? (
                <div style={{ marginTop: "20px" }}>
                    <p>로그인 상태입니다!</p>
                    <button onClick={signout} style={{ marginLeft: "10px" }}>
                        로그아웃
                    </button>
                </div>
                
            ) : (
                <div style={{ marginTop: "20px" }}>
                    <button onClick={() => navigate("/signin")}>
                        로그인
                    </button>
                    <button onClick={() => navigate("/signup")} style={{ marginLeft: "10px" }}>
                        회원가입
                    </button>
                </div>
            )}
        </div>
    );
};