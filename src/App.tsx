import React, { useEffect, useRef, useState } from "react";
import { useTokenVerification } from "./features/auth/hooks/useTokenAuth";
import { 
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,  
  useLocation
} from "react-router-dom";
import { SigninFlow } from "./features/user/signin/SigninFlow";
import { SignupFlow } from "./features/user/signup/SignupFlow";
import { FindIdFlow } from "./features/user/find-id/FindUserIdFlow";
import { FindPwFlow } from "./features/user/find-password/FindUserPwFlow";
import { ProfileFlow } from "./features/user/profile/ProfileFlow";
import { Home } from "./pages/Home";
import { AuthProvider, useAuth } from "./features/auth/context/AuthContext";
import OAuthCallbackPage from "./pages/OAuthCallback";

function AppContent() {

  const { ensureValidToken } = useTokenVerification();
  const { isLoading, isAuthenticated, accessToken } = useAuth();
  const ranRef = useRef(false);

  const location = useLocation();

useEffect(() => {
  const init = async () => {
    try{
      await ensureValidToken();
    } catch(e) {
      window.location.replace("/");
    }
  };

  init();
}, []);

  useEffect(() => {

    const isAuthPage =
      location.pathname === "/signin" ||
      location.pathname.startsWith("/oauth") ||
      location.pathname === "/signup";

      if(isAuthPage) return;

      if(!accessToken) return;

    ensureValidToken().catch(() => {});
  }, [accessToken]);

  if (isLoading && isAuthenticated) {
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
          <Route path="/" element={ <Home/> } />

          <Route path="/signin" element={<SigninFlow />} />
          <Route path="/signup" element={<SignupFlow />} />
          <Route path="/find-id" element={<FindIdFlow />} />
          <Route path="/find-pw" element={<FindPwFlow />} />
          <Route path="/oauth/:provider/callback" element={<OAuthCallbackPage />} />

          {/* 보호된 페이지 */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute accessToken={accessToken}>
                <ProfileFlow />
              </ProtectedRoute>
            }
            />

            {/* 기본 라우트 */}
            <Route path="/" element={<Home />} />
        </Routes>
      </div>
  )
}

const ProtectedRoute: React.FC<{ children: React.ReactNode; accessToken: string | null }> = ({ children, accessToken }) => {

  if(!accessToken){
    return <Navigate to="/signin" replace />;
  }

  return <>{children}</>;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  )
}


export default App;