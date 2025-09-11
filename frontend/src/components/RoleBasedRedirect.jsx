import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const RoleBasedRedirect = () => {
  const { user } = useAuth();
  
  // Get user role from labels[0]
  const userRole = user?.labels?.[0] || 'uploader';
  
  // Redirect based on role
  switch (userRole) {
    case 'uploader':
      return <Navigate to="/dashboard/uploader" replace />;
    case 'verifier':
      return <Navigate to="/dashboard/verifier" replace />;
    case 'admin':
      return <Navigate to="/dashboard/admin" replace />;
    default:
      return <Navigate to="/dashboard/uploader" replace />;
  }
};

export default RoleBasedRedirect;
