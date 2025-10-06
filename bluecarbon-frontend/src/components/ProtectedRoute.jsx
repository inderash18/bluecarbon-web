import React from 'react';
import { Navigate } from 'react-router-dom';

// Simple client-side protector using localStorage key 'bc_auth'
export default function ProtectedRoute({ children }) {
  const auth = typeof window !== 'undefined' ? localStorage.getItem('bc_auth') : null;
  if (!auth) {
    return <Navigate to="/login" replace />;
  }
  return children;
}
