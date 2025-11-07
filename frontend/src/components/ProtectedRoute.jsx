import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';

const ProtectedRoute = ({ requiredRole }) => {
    const { user, isLoading } = useAuth();

    if (isLoading) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (requiredRole && requiredRole.length > 0) {
        const hasRequiredRole = requiredRole.includes(user.role_id);
        
        if (!hasRequiredRole) {
            toast.error("Access Denied: You do not have permission to view this page.");
            return <Navigate to="/" replace />; 
        }
    }
    return <Outlet />;
};

export default ProtectedRoute;