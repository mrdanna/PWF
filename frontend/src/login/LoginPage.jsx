import React from 'react';
import LoginForm from '../components/auth/LoginForm';

function LoginPage() {
  const handleLoginSuccess = () => {
    alert("Berhasil login!");
    // Contoh redirect setelah login
    // window.location.href = "/dashboard";
  };

  return (
    <div>
      <LoginForm onLoginSuccess={handleLoginSuccess} />
    </div>
  );
}

export default LoginPage;
