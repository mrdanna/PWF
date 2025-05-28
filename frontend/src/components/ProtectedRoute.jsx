import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  const token = localStorage.getItem('token');

  // Jika tidak ada token, redirect ke halaman login
  if (!token) {
    return <Navigate to="/" replace />;
  }

  // Jika ada token, izinkan akses
  return children;
}

export default ProtectedRoute;