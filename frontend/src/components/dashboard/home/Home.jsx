import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../../axios';
import '../../../assets/css/dashboard.css';

import Header from '../layout/Header';
import Sidebar from '../layout/Sidebar';
import MainContent from '../layout/MainContent';
import Footer from '../layout/Footer';

function Home({ onLogout }) {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [username, setUsername] = useState('');
  const dropdownRef = useRef(null);

  const handleLogout = async () => {
    try {
      await api.post('/api/logout');
      localStorage.removeItem('token');
      if (onLogout) onLogout();
      navigate('/');
    } catch (error) {
      console.error('Logout gagal:', error);
    }
  };

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await api.get('/api/profile');
        setUsername(response.data.name);
      } catch (error) {
        console.error('Gagal mengambil data user:', error);
        if (onLogout) onLogout();
        navigate('/');
      }
    };

    fetchUserProfile();
  });

  return (
    <div className="dashboard-wrapper">
      <Header
        toggleDropdown={toggleDropdown}
        dropdownOpen={dropdownOpen}
        dropdownRef={dropdownRef}
        handleLogout={handleLogout}
        username={username}
      />
      <div style={{ display: 'flex', flex: 1 }}>
        <Sidebar />
        <MainContent />
      </div>
      <Footer />
    </div>
  );
}

export default Home;
