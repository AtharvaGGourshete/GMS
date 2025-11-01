// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner'; // Import toast for user feedback

// The component now accepts a 'requiredRole' array
const ProtectedRoute = ({ requiredRole }) => {
    const { user, isLoading } = useAuth();

    // 1. Loading State Check
    if (isLoading) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    // 2. Authentication Check
    if (!user) {
        // User is not logged in, redirect to login
        return <Navigate to="/login" replace />;
    }

    // 3. Role-Based Access Control (RBAC) Check
    if (requiredRole && requiredRole.length > 0) {
        // user.role_id is expected to be a number (1, 2, 3, etc.)
        const hasRequiredRole = requiredRole.includes(user.role_id);
        
        if (!hasRequiredRole) {
            // User is logged in but does not have the necessary role
            toast.error("Access Denied: You do not have permission to view this page.");
            
            // Redirect to a default authorized page (like the main dashboard)
            return <Navigate to="/" replace />; 
        }
    }

    // 4. Access Granted
    return <Outlet />;
};

export default ProtectedRoute;