import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../axios';
import '../../assets/css/login.css';

function LoginForm({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false); // State untuk loading

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);  // Menandakan bahwa proses login sedang berlangsung
    setMessage('');  // Reset pesan sebelumnya

    try {
      // Mengambil csrf-cookie terlebih dahulu
      await api.get('/sanctum/csrf-cookie');

      // Melakukan permintaan login
      const response = await api.post('/api/login', { email, password });

      // Menangani respons jika login sukses
      if (response.status === 200) {
        localStorage.setItem('token', response.data.token);  // Menyimpan token
        setMessage('Login berhasil!');
        onLoginSuccess && onLoginSuccess();  // Panggil callback setelah login berhasil
      }
    } catch (error) {
      setLoading(false);  // Selesai loading

      // Menangani error jika ada
      if (error.response) {
        // Cek jika status code 401 (Unauthorized)
        if (error.response.status === 401) {
          setMessage('Email atau password salah!');
        } else {
          setMessage('Terjadi kesalahan di server. Silakan coba lagi.');
        }
      } else if (error.request) {
        setMessage('Tidak ada respons dari server. Silakan periksa koneksi Anda.');
      } else {
        setMessage('Terjadi kesalahan saat mengirimkan permintaan.');
      }
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2 className="login-title">Login Dashboard Universitas</h2>
        {message && <p className="login-message">{message}</p>}
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
          <button type="submit" disabled={loading}>
            {loading ? 'Memuat...' : 'Login'}
          </button>
        </div>
        <p className="login-link">
          Belum punya akun? <Link to="/register">Daftar di sini</Link>
        </p>
      </form>
    </div>
  );
}

export default LoginForm;
