import React, { useEffect, useState } from "react";
import { useTokenVerification } from "./features/auth/hooks/useTokenAuth";
import { 
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate  
} from "react-router-dom";
import { SigninFlow } from "./features/user/signin/SigninFlow";
import { SignupFlow } from "./features/user/signup/SignupFlow";
import { FindIdFlow } from "./features/user/find-id/FindUserIdFlow";
import { FindPwFlow } from "./features/user/find-password/FindUserPwFlow";
import { ProfileFlow } from "./features/user/profile/ProfileFlow";

function AppContent() {
  const { ensureValidToken, isLoading } = useTokenVerification();
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  useEffect(() => {
    ensureValidToken().then(() => {
      setIsAuthChecked(true);
    });
  }, [ensureValidToken]);

  if(!isAuthChecked || isLoading) {
    return (
      <div className="loading-screen">
        <h2>토큰 검증 중...</h2>
        <p>잠시만 기다려 주세요.</p>
      </div>
    );
  }

  return (
    <div className="app">
      <Routes>
        {/* 공개 페이지 */}
        <Route path="/login" element={<SigninFlow />} />
        <Route path="/signup" element={<SignupFlow />} />
        <Route path="/find-id" element={<FindIdFlow />} />
        <Route path="/reset-password" element={<FindPwFlow />} />

        {/* 보호된 페이지 */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfileFlow />
            </ProtectedRoute>
          }
          />

          {/* 기본 라우트 */}
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </div>
  )
}

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { ensureValidToken } = useTokenVerification();

  useEffect(() => {
    ensureValidToken().then((valid) => {
      if(!valid){
        window.location.href = '/login';
      }
    });
  }, [ensureValidToken]);

  return <>{children}</>;
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}


export default App;