# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# Start development server (default port 3000)
npm start

# Start on specific port 3000
npm run start:3003

# Run tests in watch mode
npm test

# Build for production
npm run build
```

## Project Architecture

This is a Create React App TypeScript project with a feature-based architecture pattern. Each feature follows a consistent three-layer structure:

### Feature Organization Pattern

Features are located in `src/features/` and follow this structure:
- **Service layer** (`*Service.ts`): API calls using axios, defines request/response types
- **Hook layer** (`use*.ts`): Business logic, state management, orchestrates service calls
- **Flow layer** (`*Flow.tsx`): UI components, form handling with Formik + Yup

Example:
```
src/features/user/signin/
  ├── SigninService.ts   # API: SigninApi.signin()
  ├── useSignin.ts       # Hook: useSignin() → calls service, manages navigation
  └── SigninFlow.tsx     # UI: Form component
```

### Authentication System

The authentication system uses JWT tokens with automatic refresh and is split across multiple files:

1. **AuthContext** (`src/features/auth/context/AuthContext.tsx`): Global auth state provider
   - Manages `accessToken`, `isAuthenticated`, `isLoading`
   - Must wrap the app at root level
   - Export `useAuth()` hook for accessing auth state

2. **Token Management** (`src/features/auth/hooks/useTokenAuth.ts`):
   - `useTokenVerification()` hook provides:
     - `setLoginTokens()`: Store tokens after login
     - `clearTokens()`: Clear tokens on logout
     - `ensureValidToken()`: Verify/refresh token validity
     - `refreshAccessToken()`: Manually trigger token refresh
   - Tokens are checked for expiry within 5 minutes using `src/utils/jwt.ts`

3. **Axios Integration** (`src/services/axiosConfig.ts`):
   - Automatically attaches `Bearer` token to requests (except `/signin`)
   - Response interceptor handles 401 errors:
     - Attempts token refresh via `/api/auth/refresh-token`
     - Queues failed requests and retries after refresh
     - Redirects to `/signin` if refresh fails
   - Uses `setAxiosAccessToken()` to sync tokens between context and axios

4. **Protected Routes** (`src/App.tsx`):
   - `ProtectedRoute` component checks `accessToken` from `useAuth()`
   - Redirects to `/signin` if not authenticated
   - App initialization calls `ensureValidToken()` on mount

### API Integration

**Proxy Setup** (`src/setupProxy.js`):
- Development proxy: `/api/*` → `http://localhost:8181/*`
- Path rewrite removes `/api` prefix
- Backend must run on port 8181 during development

**API Client** (`src/services/axiosConfig.ts`):
- Base URL: `/api`
- Includes credentials (cookies)
- 10-second timeout
- All services import and use this configured `apiClient`

### Routing Structure

Routes defined in `src/App.tsx`:
- Public: `/signin`, `/signup`, `/find-id`, `/find-pw`
- Protected: `/profile` (requires authentication)
- Home: `/` (accessible to all)

## Key Conventions

1. **Service Naming**: Export object named `*Api` with async methods
   - Example: `SigninApi.signin()`, `ProfileApi.getProfile()`

2. **Response Handling**: Services check for `message: 'success'` in responses
   - Throw error if message !== 'success'

3. **Hook Return Pattern**: Custom hooks return object with methods/state
   - Example: `return { signin }` or `return { profile, updateProfile }`

4. **TypeScript**: Strict mode enabled, define Request/Response interfaces in service files

5. **Forms**: Use Formik for form state + Yup for validation schemas
