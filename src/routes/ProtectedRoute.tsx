import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../redux/hooks/hooks";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    const userLoginState = useAppSelector((state) => state.auth);
    let location = useLocation();

    if (!userLoginState.isLoggedIn) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
};

export default ProtectedRoute;
