import React, { useEffect, useRef, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { SigninFlow } from "./features/user/signin/SigninFlow";
import { SignupFlow } from "./features/user/signup/SignupFlow";
import { FindIdFlow } from "./features/user/find-id/FindUserIdFlow";
import { FindPwFlow } from "./features/user/find-password/FindUserPwFlow";
import { ProfileFlow } from "./features/user/profile/ProfileFlow";
import { Home } from "./pages/home/Home";
import { AuthProvider, useAuth } from "./features/auth/context/AuthContext";
import OAuthCallbackPage from "./pages/OAuthCallback";
import ProtectedRoute from "./components/ProtectedRoute";

function AppContent() {

  const { isLoading, isAuthenticated } = useAuth();

  if(isLoading) {
    return <div>로딩중...</div>
  }

  return (
    <div className="app">
      <Routes>
        {/* 공개 페이지 */}
        <Route path="/signin" element={<SigninFlow />} />
        <Route path="/signup" element={<SignupFlow />} />
        <Route path="/find-id" element={<FindIdFlow />} />
        <Route path="/find-pw" element={<FindPwFlow />} />
        <Route path="/oauth/:provider/callback" element={<OAuthCallbackPage />} />

        {/* 보호된 페이지 */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
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