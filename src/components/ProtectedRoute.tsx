import { Navigate } from "react-router-dom";

const ProtectedRoute = ({
    children,
    isAuthenticated,
}: {
    children: React.ReactNode;
    isAuthenticated: boolean;
}) => {
    if (!isAuthenticated) {
        return <Navigate to="/signin" replace />;
    }
    return <>{children}</>
};

export default ProtectedRoute;