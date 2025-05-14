// src/pages/auth/RegisterPage.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../axios'; // pastikan path-nya sesuai
import '../../assets/css/register.css';

function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      //await api.get('/sanctum/csrf-cookie'); // Ambil CSRF token
      await api.get('/sanctum/csrf-cookie', { withCredentials: true });

    //   await api.get('/sanctum/csrf-cookie', {
    //     withCredentials: true,});
      await api.post('/api/register', {
        name,
        email,
        password,
      }, {
        withCredentials: true,
        });

      setMessage('Registrasi berhasil! Silakan login.');
      setTimeout(() => navigate('/'), 2000);
    } catch (error) {
  console.error('Register error:', error); // tambahkan ini

  if (error.response) {
    console.log('Error response:', error.response.data); // tampilkan error lengkap dari server
    const errData = error.response.data;
    if (errData.errors) {
      const errors = Object.values(errData.errors).flat().join(', ');
      setMessage(errors);
    } else {
      setMessage(errData.message || 'Terjadi kesalahan, silakan coba lagi.');
    }
  } else if (error.request) {
    console.log('No response received:', error.request);
    setMessage('Tidak ada respons dari server.');
  } else {
    console.log('Request error:', error.message);
    setMessage('Terjadi kesalahan. Silakan coba lagi.');
  }
}

  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleRegister}>
        <h2 className="register-title">Register</h2>
        {message && <p className="message">{message}</p>}
        <input
          type="text"
          placeholder="Nama"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <div className="button-wrapper">
          <button type="submit">Daftar</button>
        </div>
        <p className="login-link">
          Sudah punya akun? <Link to="/">Login di sini</Link>
        </p>
      </form>
    </div>
  );
}

export default RegisterPage;
