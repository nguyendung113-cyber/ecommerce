import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import type { User } from '../types/index';

interface ProtectedRouteProps {
    allowedRoles?: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles }) => {
    const userStr = localStorage.getItem('user');
    const token = localStorage.getItem('auth_token');
    
    let user: User | null = null;
    try {
        user = userStr ? JSON.parse(userStr) : null;
    } catch (e) {
        localStorage.removeItem('user');
        localStorage.removeItem('auth_token');
    }

    if (!token || !user) {
        // Chưa đăng nhập
        return <Navigate to="/login" replace />;
    }

    if (allowedRoles && !allowedRoles.includes(user.role)) {
        // Đã đăng nhập nhưng không đúng quyền Admin/Sales -> Trả về Login
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
