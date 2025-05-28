import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../../axios';
import '../../../assets/css/dashboard.css';

import Header from './Header';
import Sidebar from './Sidebar';
import MainContent from './MainContent';
import Footer from './Footer';

function Dashboard({ onLogout = () => {} }) {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = async () => {
    try {
      await api.post('/api/logout');
      localStorage.removeItem('token');
      onLogout();
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

  return (
    <div className="dashboard-wrapper">
      <Header
        toggleDropdown={toggleDropdown}
        dropdownOpen={dropdownOpen}
        dropdownRef={dropdownRef}
        handleLogout={handleLogout}
      />
      <div style={{ display: 'flex', flex: 1 }}>
        <Sidebar />
        <MainContent />
      </div>
      <Footer />
    </div>
  );
}

export default Dashboard;
